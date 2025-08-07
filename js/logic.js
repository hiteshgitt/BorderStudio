        const card = document.getElementById('previewCard');
        const cssOutput = document.getElementById('cssOutput');
        let currentAnimation = 'none';
        let currentShadow = 'small';
        let currentBackdrop = 'none';
        let currentRepeat = 'stretch';

        // Preset border images
        const presetImages = document.querySelectorAll('.preset-image');
        presetImages.forEach(img => {
            img.addEventListener('click', () => {
                presetImages.forEach(p => p.classList.remove('active'));
                img.classList.add('active');
                document.getElementById('borderImageSource').value = img.dataset.url;
                updatePreview();
            });
        });

        // Toggle buttons
        document.querySelectorAll('.toggle-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.parentElement;
                const type = btn.dataset.repeat || btn.dataset.shadow || btn.dataset.animation || btn.dataset.backdrop;
                
                group.querySelectorAll('.toggle-button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (btn.dataset.repeat) currentRepeat = type;
                if (btn.dataset.shadow) currentShadow = type;
                if (btn.dataset.animation) currentAnimation = type;
                if (btn.dataset.backdrop) currentBackdrop = type;
                
                updatePreview();
            });
        });

        function updatePreview() {
            const unit = document.getElementById('borderWidthUnit').value;
            
            // Width values
            const borderTopWidth = document.getElementById('borderTopWidth').value;
            const borderRightWidth = document.getElementById('borderRightWidth').value;
            const borderBottomWidth = document.getElementById('borderBottomWidth').value;
            const borderLeftWidth = document.getElementById('borderLeftWidth').value;
            
            // Style values
            const borderTopStyle = document.getElementById('borderTopStyle').value;
            const borderRightStyle = document.getElementById('borderRightStyle').value;
            const borderBottomStyle = document.getElementById('borderBottomStyle').value;
            const borderLeftStyle = document.getElementById('borderLeftStyle').value;
            
            // Color values
            const borderTopColor = document.getElementById('borderTopColor').value;
            const borderRightColor = document.getElementById('borderRightColor').value;
            const borderBottomColor = document.getElementById('borderBottomColor').value;
            const borderLeftColor = document.getElementById('borderLeftColor').value;
            
            // Radius values
            const borderTopLeftRadius = document.getElementById('borderTopLeftRadius').value;
            const borderTopRightRadius = document.getElementById('borderTopRightRadius').value;
            const borderBottomRightRadius = document.getElementById('borderBottomRightRadius').value;
            const borderBottomLeftRadius = document.getElementById('borderBottomLeftRadius').value;
            
            // Border image values
            const borderImageSource = document.getElementById('borderImageSource').value;
            const borderImageSliceTop = document.getElementById('borderImageSliceTop').value;
            const borderImageSliceRight = document.getElementById('borderImageSliceRight').value;
            const borderImageSliceBottom = document.getElementById('borderImageSliceBottom').value;
            const borderImageSliceLeft = document.getElementById('borderImageSliceLeft').value;
            const borderImageWidth = document.getElementById('borderImageWidth').value;
            const borderImageOutset = document.getElementById('borderImageOutset').value;
            
            // Advanced properties
            const shadowBlur = document.getElementById('shadowBlur').value;
            const shadowSpread = document.getElementById('shadowSpread').value;
            const shadowColor = document.getElementById('shadowColor').value;
            const shadowOpacity = document.getElementById('shadowOpacity').value;
            const boxSizing = document.getElementById('boxSizing').value;
            const outlineWidth = document.getElementById('outlineWidth').value;
            const outlineColor = document.getElementById('outlineColor').value;
            
            // Animation values
            const animationSpeed = document.getElementById('animationSpeed').value;
            const filterIntensity = document.getElementById('filterIntensity').value;

            // Apply border styles
            card.style.borderTopWidth = borderTopWidth + unit;
            card.style.borderRightWidth = borderRightWidth + unit;
            card.style.borderBottomWidth = borderBottomWidth + unit;
            card.style.borderLeftWidth = borderLeftWidth + unit;
            
            card.style.borderTopStyle = borderTopStyle;
            card.style.borderRightStyle = borderRightStyle;
            card.style.borderBottomStyle = borderBottomStyle;
            card.style.borderLeftStyle = borderLeftStyle;
            
            card.style.borderTopColor = borderTopColor;
            card.style.borderRightColor = borderRightColor;
            card.style.borderBottomColor = borderBottomColor;
            card.style.borderLeftColor = borderLeftColor;
            
            card.style.borderTopLeftRadius = borderTopLeftRadius + 'px';
            card.style.borderTopRightRadius = borderTopRightRadius + 'px';
            card.style.borderBottomRightRadius = borderBottomRightRadius + 'px';
            card.style.borderBottomLeftRadius = borderBottomLeftRadius + 'px';

            // Apply advanced properties
            card.style.boxSizing = boxSizing;
            
            if (outlineWidth > 0) {
                card.style.outline = `${outlineWidth}px solid ${outlineColor}`;
            } else {
                card.style.outline = 'none';
            }

            // Apply border image
            if (borderImageSource.trim()) {
                // For border-image to work, we need a border width > 0
                const hasValidBorder = borderTopWidth > 0 || borderRightWidth > 0 || borderBottomWidth > 0 || borderLeftWidth > 0;
                
                if (hasValidBorder) {
                    card.style.borderImageSource = `url("${borderImageSource}")`;
                    card.style.borderImageSlice = `${borderImageSliceTop} ${borderImageSliceRight} ${borderImageSliceBottom} ${borderImageSliceLeft}`;
                    card.style.borderImageWidth = `${borderImageWidth}`;
                    card.style.borderImageOutset = `${borderImageOutset}px`;
                    card.style.borderImageRepeat = currentRepeat;
                    
                    // When using border-image, we should set border-style to solid for better visibility
                    if (borderTopStyle === 'none') card.style.borderTopStyle = 'solid';
                    if (borderRightStyle === 'none') card.style.borderRightStyle = 'solid';
                    if (borderBottomStyle === 'none') card.style.borderBottomStyle = 'solid';
                    if (borderLeftStyle === 'none') card.style.borderLeftStyle = 'solid';
                } else {
                    // If no border width, set minimum width for border-image to show
                    card.style.borderWidth = '10px';
                    card.style.borderStyle = 'solid';
                    card.style.borderImageSource = `url("${borderImageSource}")`;
                    card.style.borderImageSlice = `${borderImageSliceTop} ${borderImageSliceRight} ${borderImageSliceBottom} ${borderImageSliceLeft}`;
                    card.style.borderImageWidth = `${borderImageWidth}`;
                    card.style.borderImageOutset = `${borderImageOutset}px`;
                    card.style.borderImageRepeat = currentRepeat;
                }
            } else {
                card.style.borderImageSource = 'none';
                card.style.borderImageSlice = 'initial';
                card.style.borderImageWidth = 'initial';
                card.style.borderImageOutset = 'initial';
                card.style.borderImageRepeat = 'initial';
            }

            // Apply shadow
            let shadowValue = 'none';
            if (currentShadow !== 'none') {
                const hex = shadowColor.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                const rgba = `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
                
                const shadowSizes = {
                    small: '0 4px 6px -1px',
                    medium: `0 10px 15px -3px`,
                    large: `0 25px 50px -12px`
                };
                shadowValue = `${shadowSizes[currentShadow]} ${rgba}, 0 ${Math.floor(shadowBlur/2)}px ${Math.floor(shadowBlur/4)}px -${Math.floor(shadowSpread/2)}px ${rgba}`;
            }
            card.style.boxShadow = shadowValue;

            // Apply backdrop filter
            let backdropValue = 'none';
            if (currentBackdrop !== 'none') {
                const filters = {
                    blur: `blur(${filterIntensity}px)`,
                    brightness: `brightness(${1 + filterIntensity/20})`,
                    contrast: `contrast(${1 + filterIntensity/20})`
                };
                backdropValue = filters[currentBackdrop];
            }
            card.style.backdropFilter = backdropValue;

            // Apply animations
            card.style.animation = 'none';
            if (currentAnimation !== 'none') {
                const animations = {
                    pulse: `pulse ${animationSpeed}s ease-in-out infinite`,
                    glow: `glow ${animationSpeed}s ease-in-out infinite alternate`,
                    rotate: `rotate ${animationSpeed}s linear infinite`,
                    scale: `scale ${animationSpeed}s ease-in-out infinite alternate`
                };
                card.style.animation = animations[currentAnimation];
            }

            // Update value displays
            updateValueDisplays();
            generateCSS();
        }

        function updateValueDisplays() {
            const unit = document.getElementById('borderWidthUnit').value;
            
            // Width displays
            document.getElementById('borderWidthValue').textContent = document.getElementById('borderWidth').value + unit;
            document.getElementById('borderTopWidthValue').textContent = document.getElementById('borderTopWidth').value + unit;
            document.getElementById('borderRightWidthValue').textContent = document.getElementById('borderRightWidth').value + unit;
            document.getElementById('borderBottomWidthValue').textContent = document.getElementById('borderBottomWidth').value + unit;
            document.getElementById('borderLeftWidthValue').textContent = document.getElementById('borderLeftWidth').value + unit;
            
            // Radius displays
            document.getElementById('borderRadiusValue').textContent = document.getElementById('borderRadius').value + 'px';
            document.getElementById('borderTopLeftRadiusValue').textContent = document.getElementById('borderTopLeftRadius').value + 'px';
            document.getElementById('borderTopRightRadiusValue').textContent = document.getElementById('borderTopRightRadius').value + 'px';
            document.getElementById('borderBottomRightRadiusValue').textContent = document.getElementById('borderBottomRightRadius').value + 'px';
            document.getElementById('borderBottomLeftRadiusValue').textContent = document.getElementById('borderBottomLeftRadius').value + 'px';
            
            // Border image displays
            document.getElementById('borderImageSliceTopValue').textContent = document.getElementById('borderImageSliceTop').value;
            document.getElementById('borderImageSliceRightValue').textContent = document.getElementById('borderImageSliceRight').value;
            document.getElementById('borderImageSliceBottomValue').textContent = document.getElementById('borderImageSliceBottom').value;
            document.getElementById('borderImageSliceLeftValue').textContent = document.getElementById('borderImageSliceLeft').value;
            document.getElementById('borderImageWidthValue').textContent = document.getElementById('borderImageWidth').value;
            document.getElementById('borderImageOutsetValue').textContent = document.getElementById('borderImageOutset').value + 'px';
            
            // Advanced displays
            document.getElementById('shadowBlurValue').textContent = document.getElementById('shadowBlur').value + 'px';
            document.getElementById('shadowSpreadValue').textContent = document.getElementById('shadowSpread').value + 'px';
            document.getElementById('shadowOpacityValue').textContent = document.getElementById('shadowOpacity').value;
            document.getElementById('outlineWidthValue').textContent = document.getElementById('outlineWidth').value + 'px';
            
            // Animation displays
            document.getElementById('animationSpeedValue').textContent = document.getElementById('animationSpeed').value + 's';
            document.getElementById('filterIntensityValue').textContent = document.getElementById('filterIntensity').value + 'px';
        }

        function generateCSS() {
            const unit = document.getElementById('borderWidthUnit').value;
            
            const borderTopWidth = document.getElementById('borderTopWidth').value;
            const borderRightWidth = document.getElementById('borderRightWidth').value;
            const borderBottomWidth = document.getElementById('borderBottomWidth').value;
            const borderLeftWidth = document.getElementById('borderLeftWidth').value;
            
            const borderTopStyle = document.getElementById('borderTopStyle').value;
            const borderRightStyle = document.getElementById('borderRightStyle').value;
            const borderBottomStyle = document.getElementById('borderBottomStyle').value;
            const borderLeftStyle = document.getElementById('borderLeftStyle').value;
            
            const borderTopColor = document.getElementById('borderTopColor').value;
            const borderRightColor = document.getElementById('borderRightColor').value;
            const borderBottomColor = document.getElementById('borderBottomColor').value;
            const borderLeftColor = document.getElementById('borderLeftColor').value;
            
            const borderTopLeftRadius = document.getElementById('borderTopLeftRadius').value;
            const borderTopRightRadius = document.getElementById('borderTopRightRadius').value;
            const borderBottomRightRadius = document.getElementById('borderBottomRightRadius').value;
            const borderBottomLeftRadius = document.getElementById('borderBottomLeftRadius').value;

            let css = `<span class="css-comment">/* Individual Border Properties */</span>
<span class="css-property">border-top-width</span>: <span class="css-value">${borderTopWidth}${unit}</span>;
<span class="css-property">border-right-width</span>: <span class="css-value">${borderRightWidth}${unit}</span>;
<span class="css-property">border-bottom-width</span>: <span class="css-value">${borderBottomWidth}${unit}</span>;
<span class="css-property">border-left-width</span>: <span class="css-value">${borderLeftWidth}${unit}</span>;

<span class="css-property">border-top-style</span>: <span class="css-value">${borderTopStyle}</span>;
<span class="css-property">border-right-style</span>: <span class="css-value">${borderRightStyle}</span>;
<span class="css-property">border-bottom-style</span>: <span class="css-value">${borderBottomStyle}</span>;
<span class="css-property">border-left-style</span>: <span class="css-value">${borderLeftStyle}</span>;

<span class="css-property">border-top-color</span>: <span class="css-value">${borderTopColor}</span>;
<span class="css-property">border-right-color</span>: <span class="css-value">${borderRightColor}</span>;
<span class="css-property">border-bottom-color</span>: <span class="css-value">${borderBottomColor}</span>;
<span class="css-property">border-left-color</span>: <span class="css-value">${borderLeftColor}</span>;

<span class="css-property">border-top-left-radius</span>: <span class="css-value">${borderTopLeftRadius}px</span>;
<span class="css-property">border-top-right-radius</span>: <span class="css-value">${borderTopRightRadius}px</span>;
<span class="css-property">border-bottom-right-radius</span>: <span class="css-value">${borderBottomRightRadius}px</span>;
<span class="css-property">border-bottom-left-radius</span>: <span class="css-value">${borderBottomLeftRadius}px</span>;

<span class="css-comment">/* Shorthand Properties */</span>
<span class="css-property">border-width</span>: <span class="css-value">${borderTopWidth}${unit} ${borderRightWidth}${unit} ${borderBottomWidth}${unit} ${borderLeftWidth}${unit}</span>;
<span class="css-property">border-style</span>: <span class="css-value">${borderTopStyle} ${borderRightStyle} ${borderBottomStyle} ${borderLeftStyle}</span>;
<span class="css-property">border-color</span>: <span class="css-value">${borderTopColor} ${borderRightColor} ${borderBottomColor} ${borderLeftColor}</span>;
<span class="css-property">border-radius</span>: <span class="css-value">${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px</span>;`;

            // Add border image properties if source is provided
            const borderImageSource = document.getElementById('borderImageSource').value;
            if (borderImageSource.trim()) {
                const borderImageSliceTop = document.getElementById('borderImageSliceTop').value;
                const borderImageSliceRight = document.getElementById('borderImageSliceRight').value;
                const borderImageSliceBottom = document.getElementById('borderImageSliceBottom').value;
                const borderImageSliceLeft = document.getElementById('borderImageSliceLeft').value;
                const borderImageWidth = document.getElementById('borderImageWidth').value;
                const borderImageOutset = document.getElementById('borderImageOutset').value;
                
                css += `

<span class="css-comment">/* Border Image Properties */</span>
<span class="css-property">border-image-source</span>: <span class="css-value">url("${borderImageSource}")</span>;
<span class="css-property">border-image-slice</span>: <span class="css-value">${borderImageSliceTop} ${borderImageSliceRight} ${borderImageSliceBottom} ${borderImageSliceLeft}</span>;
<span class="css-property">border-image-width</span>: <span class="css-value">${borderImageWidth}</span>;
<span class="css-property">border-image-outset</span>: <span class="css-value">${borderImageOutset}px</span>;
<span class="css-property">border-image-repeat</span>: <span class="css-value">${currentRepeat}</span>;

<span class="css-comment">/* Border Image Shorthand */</span>
<span class="css-property">border-image</span>: <span class="css-value">url("${borderImageSource}") ${borderImageSliceTop} ${borderImageSliceRight} ${borderImageSliceBottom} ${borderImageSliceLeft} / ${borderImageWidth} / ${borderImageOutset}px ${currentRepeat}</span>;`;
            }

            // Add shadow if not none
            if (currentShadow !== 'none') {
                css += `

<span class="css-comment">/* Box Shadow */</span>
<span class="css-property">box-shadow</span>: <span class="css-value">${card.style.boxShadow}</span>;`;
            }

            // Add backdrop filter if not none
            if (currentBackdrop !== 'none') {
                css += `

<span class="css-comment">/* Backdrop Filter */</span>
<span class="css-property">backdrop-filter</span>: <span class="css-value">${card.style.backdropFilter}</span>;`;
            }

            // Add animation if not none
            if (currentAnimation !== 'none') {
                css += `

<span class="css-comment">/* Animation */</span>
<span class="css-property">animation</span>: <span class="css-value">${card.style.animation}</span>;`;
            }

            cssOutput.innerHTML = css;
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes glow {
                0% { filter: drop-shadow(0 0 5px currentColor); }
                100% { filter: drop-shadow(0 0 20px currentColor); }
            }
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes scale {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);

        // Handle "All Sides" controls
        function setupAllSidesControls() {
            // Border Width - All Sides
            document.getElementById('borderWidth').addEventListener('input', (e) => {
                const value = e.target.value;
                ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'].forEach(id => {
                    document.getElementById(id).value = value;
                });
                updatePreview();
            });

            // Border Style - All Sides  
            document.getElementById('borderStyle').addEventListener('change', (e) => {
                const value = e.target.value;
                ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'].forEach(id => {
                    document.getElementById(id).value = value;
                });
                updatePreview();
            });

            // Border Color - All Sides
            document.getElementById('borderColor').addEventListener('input', (e) => {
                const value = e.target.value;
                ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'].forEach(id => {
                    document.getElementById(id).value = value;
                });
                updatePreview();
            });

            // Border Radius - All Corners
            document.getElementById('borderRadius').addEventListener('input', (e) => {
                const value = e.target.value;
                ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].forEach(id => {
                    document.getElementById(id).value = value;
                });
                updatePreview();
            });
        }

        // Event listeners
        document.querySelectorAll('input, select').forEach(input => {
            // Skip the "all sides" controls as they have special handlers
            if (!['borderWidth', 'borderStyle', 'borderColor', 'borderRadius'].includes(input.id)) {
                input.addEventListener('input', updatePreview);
                input.addEventListener('change', updatePreview);
            }
        });

        // Setup all sides controls
        setupAllSidesControls();

        // Initialize
        updatePreview();