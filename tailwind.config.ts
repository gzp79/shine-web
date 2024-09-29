import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

module.exports = {
    content: ['./src/**/*.{svelte,js,ts}'],
    plugins: [daisyui],

    theme: {
        extend: {
            width: {
                'min-content': 'min-content'
            },
            transitionProperty: {
                visibility:
                    'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, visibility'
            },
            boxShadowColor: {
                base: 'var(--bsh)'
            },
            stroke: {
                highlight: 'hsl(var(--hc))'
            }
        }
    },

    daisyui: {
        themes: [
            {
                light: {
                    ...themes['light'],
                    '--hc': '259 94% 71%'
                }
            },
            {
                dark: {
                    ...themes['dark'],
                    primary: '#3B71CA',
                    secondary: '#9FA6B2',
                    //accent: '#00ffff',
                    //neutral: '#ff00ff',
                    'base-100': '#303030',
                    'base-200': '#404040',
                    'base-300': '#505050',
                    'base-content': '#f5f5f5',
                    '--bsh': '#101010',
                    info: '#54B4D3',
                    success: '#14A44D',
                    warning: '#E4A11B',
                    error: '#DC4C64',
                    '--hc': '183 47% 79%'
                }
            }
        ],
        logs: true
    }
};
