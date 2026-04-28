import React, { useEffect } from "react";

declare global {
  interface Window {
    REQUIRED_CODE_ERROR_MESSAGE: string;
    LOCALE: string;
    EMAIL_INVALID_MESSAGE: string;
    SMS_INVALID_MESSAGE: string;
    REQUIRED_ERROR_MESSAGE: string;
    GENERIC_INVALID_MESSAGE: string;
    translation: any;
    AUTOHIDE: boolean;
    handleCaptchaResponse: () => void;
  }
}

const BrevoForm: React.FC = () => {
  useEffect(() => {
    // Brevo Configuration
    window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
    window.LOCALE = 'en';
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
    window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
    window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
    window.AUTOHIDE = false;
    window.translation = {
      common: {
        selectedList: '{quantity} list selected',
        selectedLists: '{quantity} lists selected',
        selectedOption: '{quantity} selected',
        selectedOptions: '{quantity} selected',
      }
    };

    // Global Captcha Handler
    window.handleCaptchaResponse = function() {
      const captchaEl = document.getElementById('sib-captcha');
      if (captchaEl) {
        const event = new Event('captchaChange');
        captchaEl.dispatchEvent(event);
      }
    };

    // Load Scripts and Styles
    const loadScript = (src: string, isAsync = false, defer = false) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = isAsync;
      script.defer = defer;
      document.body.appendChild(script);
      return script;
    };

    const loadStyle = (href: string) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    };

    const mainScript = loadScript("https://sibforms.com/forms/end-form/build/main.js", false, true);
    const recaptchaScript = loadScript("https://www.google.com/recaptcha/api.js?render=6LdU0M0sAAAAAGDWgRryotUmGdCTTku8c0un_WUc&hl=en", true, true);
    const sibStyles = loadStyle("https://sibforms.com/forms/end-form/build/sib-styles.css");

    return () => {
      if (document.body.contains(mainScript)) document.body.removeChild(mainScript);
      if (document.body.contains(recaptchaScript)) document.body.removeChild(recaptchaScript);
      if (document.head.contains(sibStyles)) document.head.removeChild(sibStyles);
    };
  }, []);

  return (
    <div className="sib-form" style={{ textAlign: "center", backgroundColor: "transparent" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        #sib-container input#EMAIL {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        #sib-container input#EMAIL::placeholder {
          color: #9ca3af !important;
          -webkit-text-fill-color: #9ca3af !important;
        }
      ` }} />
      <div id="sib-form-container" className="sib-form-container">
        {/* Error Message */}
        <div 
          id="error-message" 
          className="sib-form-message-panel hidden" 
          style={{ 
            fontSize: "18px", 
            textAlign: "left", 
            fontFamily: "var(--font-sans)", 
            color: "#661d1d", 
            backgroundColor: "#ffeded", 
            borderRadius: "12px", 
            borderColor: "#ff4949", 
            maxWidth: "540px",
            margin: "0 auto 1.5rem"
          }}
        >
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon w-5 h-5 inline-block mr-2">
              <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
            </svg>
            <span className="sib-form-message-panel__inner-text font-sans uppercase text-xs tracking-wider">
              Your subscription could not be saved. Please try again.
            </span>
          </div>
        </div>

        {/* Success Message */}
        <div 
          id="success-message" 
          className="sib-form-message-panel hidden" 
          style={{ 
            fontSize: "18px", 
            textAlign: "left", 
            fontFamily: "var(--font-sans)", 
            color: "#085229", 
            backgroundColor: "#e7faf0", 
            borderRadius: "12px", 
            borderColor: "#13ce66", 
            maxWidth: "540px",
            margin: "0 auto 1.5rem"
          }}
        >
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon w-5 h-5 inline-block mr-2">
              <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
            </svg>
            <span className="sib-form-message-panel__inner-text font-sans uppercase text-xs tracking-wider">
              Thank you for following our project! Please keep an eye out for progression and updates.
            </span>
          </div>
        </div>

      {/* Form Container */}
      <div 
        id="sib-container" 
        className="sib-container--large sib-container--vertical shadow-2xl" 
        style={{ 
          textAlign: "center", 
          backgroundColor: "rgba(20, 24, 32, 0.8)", 
          maxWidth: "540px", 
          borderRadius: "24px", 
          borderWidth: "1px", 
          borderColor: "rgba(61, 122, 184, 0.3)", 
          borderStyle: "solid", 
          direction: "ltr",
          margin: "0 auto",
          padding: "2rem",
          backdropBlur: "12px"
        }}
      >
        <form 
          id="sib-form" 
          method="POST" 
          action="https://b8804975.sibforms.com/serve/MUIFACvMwoAVNzSECkaRBDPzAdsI8ogjopZoYRb9MtrW7xvTuS7-FBROgTNpbiiLOcZ8NMNFOROxgRWjlvYm93NatFHdhSD_hSg1v85ATkXUJa9Uaof8-JYFaU7nb3vtfwzgwcffrEYPsFcOTp3xJARxOYJZ8hqhOgdZpEex0H31C-JBxad2JAENi-EM1CIBo9dyOlyT6-pKsmU-3A==" 
          data-type="subscription"
        >
          {/* Marquee Banner - Moved to Top */}
          <div className="bg-steel-blue overflow-hidden whitespace-nowrap py-2.5 -mx-8 -mt-8 mb-8 relative rounded-t-[23px] border-b border-white/10">
            <div 
              className="inline-block whitespace-nowrap"
              style={{ 
                animation: "marquee 30s linear infinite",
                display: "inline-block"
              }}
            >
              {[...Array(8)].map((_, i) => (
                <span key={i} className="text-white font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs pr-[50px]">
                  Kickstarter Date Announcement Soon!
                </span>
              ))}
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-6">
            <div 
              className="sib-form-block" 
              style={{ 
                fontSize: "36px", 
                textAlign: "center", 
                fontWeight: "400", 
                fontFamily: "var(--font-display)", 
                color: "var(--color-mint-cream)", 
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                lineHeight: "1.2"
              }}
            >
              <p>Sign up for updates!</p>
            </div>
          </div>

          {/* Subtitle Section */}
          <div className="mb-8 border-b border-steel-blue/10 pb-6">
            <div 
              className="sib-form-block" 
              style={{ 
                fontSize: "20px", 
                textAlign: "center", 
                fontFamily: "var(--font-sans)", 
                color: "rgba(238, 243, 239, 0.8)", 
                fontWeight: "300",
                lineHeight: "1.6"
              }}
            >
              <div className="sib-text-form-block space-y-4">
                <p>Sign up to stay updated on all things Region Locked!</p>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="mb-8">
            <div className="sib-input sib-form-block">
              <div className="form__entry entry_block">
                <div className="form__label-row space-y-3">
                  <label 
                    className="entry__label block uppercase tracking-[0.2em] font-mono text-left font-bold text-steel-blue" 
                    style={{ fontSize: "13px" }}
                    htmlFor="EMAIL" 
                    data-required="*"
                  >
                    Enter your email address to subscribe
                  </label>

                  <div className="entry__field">
                    <input 
                      className="input w-full bg-white border border-steel-blue/40 rounded-xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:border-steel-blue transition-all font-sans text-lg font-bold" 
                      type="email" 
                      id="EMAIL" 
                      name="EMAIL" 
                      autoComplete="email" 
                      placeholder="your@email.com" 
                      data-required="true" 
                      required 
                    />
                  </div>
                </div>

                <label className="entry__error entry__error--primary mt-2 block text-sm font-sans text-red-400 text-left px-2" style={{ borderRadius: "8px" }}></label>
                <label className="entry__specification mt-3 block text-xs uppercase tracking-wider font-mono text-left px-2" style={{ color: "#c5c5c5" }}>
                  Provide your email address to subscribe.
                </label>
              </div>
            </div>
          </div>

          {/* Hidden Captcha Section for v3 */}
          <div className="hidden">
            <div className="g-recaptcha-v3" data-sitekey="6LdU0M0sAAAAAGDWgRryotUmGdCTTku8c0un_WUc"></div>
          </div>

          {/* Submit Section */}
          <div className="mt-4">
            <div className="sib-form-block" style={{ textAlign: "center" }}>
              <button 
                className="sib-form-block__button sib-form-block__button-with-loader w-full bg-steel-blue hover:bg-mint-cream text-ink-black font-display text-2xl py-4 rounded-xl transition-all transform active:scale-[0.98] tracking-widest flex items-center justify-center gap-3 group" 
                form="sib-form" 
                type="submit"
              >
                <svg 
                  className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon w-6 h-6 animate-spin hidden" 
                  viewBox="0 0 512 512"
                >
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" fill="currentColor" />
                </svg>
                <span>FOLLOW PROJECT</span>
              </button>
            </div>
          </div>

          <input type="text" name="email_address_check" defaultValue="" className="hidden" />
          <input type="hidden" name="locale" value="en" />
        </form>
      </div>
    </div>
  </div>
);
};

export default BrevoForm;
