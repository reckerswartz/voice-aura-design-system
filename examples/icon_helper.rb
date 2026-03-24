# frozen_string_literal: true

# ============================================================================
# Voice Aura — Icon & Brand SVG Helper for Rails
# ============================================================================
#
# INSTALLATION:
#   Copy this file to:  app/helpers/icon_helper.rb
#
# PREREQUISITES:
#   The design system must be at:  vendor/voice-aura-design-system/
#   with Lucide icons in:          vendor/voice-aura-design-system/assets/icons/lucide/
#
# USAGE IN ERB:
#   <%= va_icon "mic" %>
#   <%= va_icon "send", size: 20, css_class: "va-icon va-icon--primary" %>
#   <%= va_icon "headphones", size: 32, stroke_width: 1.5, aria_label: "Audio" %>
#   <%= va_logo %>
#   <%= va_logo variant: :icon %>
#   <%= va_logo variant: :white, size: 32 %>
#
# REFERENCE:
#   Full icon list     → vendor/voice-aura-design-system/ASSET_GUIDELINES.md
#   Visual showcase    → vendor/voice-aura-design-system/docs/assets.html
#   54 curated icons   → vendor/voice-aura-design-system/assets/icons/lucide/
#   Custom voice icons → vendor/voice-aura-design-system/assets/icons/*.svg
#   Brand logos        → vendor/voice-aura-design-system/assets/brand/*.svg
#
# ============================================================================

module IconHelper
  DESIGN_SYSTEM_ROOT = Rails.root.join("vendor", "voice-aura-design-system", "assets")
  LUCIDE_PATH        = DESIGN_SYSTEM_ROOT.join("icons", "lucide")
  CUSTOM_ICON_PATH   = DESIGN_SYSTEM_ROOT.join("icons")
  BRAND_PATH         = DESIGN_SYSTEM_ROOT.join("brand")

  # --------------------------------------------------------------------------
  # Render an icon as inline SVG.
  #
  # Searches Lucide icons first, then custom Voice Aura icons.
  #
  # @param name         [String]  Icon name without extension (e.g. "mic", "play-circle")
  # @param size         [Integer] Width and height in pixels (default: 24)
  # @param css_class    [String]  CSS class(es) to add to the <svg> (default: "va-icon")
  # @param stroke_width [Numeric] SVG stroke-width attribute (default: 2)
  # @param aria_label   [String]  Accessible label; if set, adds role="img" instead of aria-hidden
  # @param attrs        [Hash]    Extra HTML attributes forwarded to the <svg> tag
  #
  # @return [ActiveSupport::SafeBuffer] Inline SVG markup
  # --------------------------------------------------------------------------
  def va_icon(name, size: 24, css_class: "va-icon", stroke_width: 2, aria_label: nil, **attrs)
    file = LUCIDE_PATH.join("#{name}.svg")
    file = CUSTOM_ICON_PATH.join("#{name}.svg") unless file.exist?

    unless file.exist?
      Rails.logger.warn { "[VoiceAura] Icon not found: #{name}" }
      return content_tag(:span, name, class: css_class)
    end

    svg = file.read

    # Set dimensions and stroke
    svg = svg.gsub(/width="[^"]*"/, %(width="#{size}"))
             .gsub(/height="[^"]*"/, %(height="#{size}"))
             .gsub(/stroke-width="[^"]*"/, %(stroke-width="#{stroke_width}"))

    # Accessibility: decorative by default, labelled if aria_label is provided
    if aria_label
      svg = svg.sub("<svg", %(<svg class="#{css_class}" role="img" aria-label="#{ERB::Util.html_escape(aria_label)}"))
    else
      svg = svg.sub("<svg", %(<svg class="#{css_class}" aria-hidden="true" focusable="false"))
    end

    # Forward extra HTML attributes
    attrs.each do |key, val|
      attr_name = key.to_s.tr("_", "-")
      svg = svg.sub("<svg", %(<svg #{attr_name}="#{ERB::Util.html_escape(val)}"))
    end

    svg.html_safe
  end

  # --------------------------------------------------------------------------
  # Render the Voice Aura brand logo as inline SVG.
  #
  # @param variant [:full, :icon, :white]  Logo variant (default: :full)
  # @param size    [Integer, nil]          Override width/height (nil keeps original)
  #
  # @return [ActiveSupport::SafeBuffer] Inline SVG markup
  # --------------------------------------------------------------------------
  def va_logo(variant: :full, size: nil)
    filename = case variant
               when :icon  then "logo-icon.svg"
               when :white then "logo-icon-white.svg"
               else             "logo-full.svg"
               end

    file = BRAND_PATH.join(filename)

    unless file.exist?
      Rails.logger.warn { "[VoiceAura] Brand logo not found: #{filename}" }
      return "".html_safe
    end

    svg = file.read

    if size
      svg = svg.gsub(/width="[^"]*"/, %(width="#{size}"))
               .gsub(/height="[^"]*"/, %(height="#{size}"))
    end

    svg = svg.sub("<svg", '<svg aria-hidden="true" focusable="false"')
    svg.html_safe
  end
end
