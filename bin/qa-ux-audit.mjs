import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const root='/home/pkumar/voice-aura-design-system';
const docs=path.join(root,'docs');
const outDir=path.join(root,'audit-screenshots','ux-audit-2026-03-24');
fs.mkdirSync(outDir,{recursive:true});

const pages=['sample.html','pixel-perfect.html','reference.html','backgrounds-reference.html'];
const viewports=[
  {name:'desktop', width:1440, height:2200},
  {name:'tablet', width:768, height:1400},
  {name:'mobile', width:375, height:1200},
];

const browser=await chromium.launch({headless:true});
const results=[];

for(const vp of viewports){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height}, deviceScaleFactor:2});
  for(const file of pages){
    const page=await context.newPage();
    const consoleMsgs=[]; const pageErrors=[];
    page.on('console',msg=>{ if(['error','warning'].includes(msg.type())) consoleMsgs.push(`${msg.type()}: ${msg.text()}`)});
    page.on('pageerror',err=>pageErrors.push(String(err)));

    await page.goto('file://' + path.join(docs,file),{waitUntil:'load'});
    await page.waitForTimeout(300);

    // Scroll usability sampling
    const usability=await page.evaluate(async()=>{
      const h=document.documentElement.scrollHeight;
      const points=[0, Math.floor(h*0.2), Math.floor(h*0.4), Math.floor(h*0.6), Math.floor(h*0.8)];
      const samples=[];
      for(const y of points){
        window.scrollTo({top:y, behavior:'instant'});
        await new Promise(r=>setTimeout(r,80));
        const toc=document.querySelector('.ref-toc');
        const tocRect=toc?.getBoundingClientRect();
        const activeLinks=[...document.querySelectorAll('.ref-toc a')].filter(a=>a.classList.contains('active')||a.getAttribute('aria-current')==='true').map(a=>a.getAttribute('href'));
        const stickyLikely=!!(tocRect && tocRect.top>=0 && tocRect.top<120 && tocRect.bottom>120);
        samples.push({y, hasToc:!!toc, tocTop:tocRect?.top ?? null, tocBottom:tocRect?.bottom ?? null, stickyLikely, activeLinksCount:activeLinks.length});
      }
      const hasCopyButtons=!!document.querySelector('[data-copy], .copy-btn, .ref-copy-btn, button[aria-label*="copy" i]');
      const codeBlocks=document.querySelectorAll('pre code, .ref-card__code').length;
      const inlineStyles=document.querySelectorAll('[style]').length;
      const hashLinks=[...document.querySelectorAll('a[href^="#"]')].length;
      return {samples, hasCopyButtons, codeBlocks, inlineStyles, hashLinks, docHeight:h};
    });

    // navbar toggle interaction if present
    const navCheck=await page.evaluate(()=>{
      const toggle=document.querySelector('.va-navbar-toggle');
      const collapse=document.querySelector('.va-navbar-collapse');
      if(!toggle || !collapse) return {present:false, works:null};
      const before=collapse.classList.contains('is-open');
      toggle.dispatchEvent(new MouseEvent('click',{bubbles:true}));
      const after=collapse.classList.contains('is-open');
      return {present:true, works:before!==after};
    });

    // screenshots at top/mid/deep
    const stem=file.replace('.html','');
    await page.screenshot({path:path.join(outDir,`${stem}-${vp.name}-top.png`), fullPage:false});
    await page.evaluate((h)=>window.scrollTo(0,Math.floor(h*0.45)), usability.docHeight);
    await page.waitForTimeout(120);
    await page.screenshot({path:path.join(outDir,`${stem}-${vp.name}-mid.png`), fullPage:false});
    await page.evaluate((h)=>window.scrollTo(0,Math.floor(h*0.8)), usability.docHeight);
    await page.waitForTimeout(120);
    await page.screenshot({path:path.join(outDir,`${stem}-${vp.name}-deep.png`), fullPage:false});

    results.push({file, viewport:vp.name, consoleMsgs, pageErrors, usability, navCheck});
    await page.close();
  }
  await context.close();
}

await browser.close();
const out=path.join(outDir,'ux-audit-report.json');
fs.writeFileSync(out, JSON.stringify(results,null,2));
console.log(out);
