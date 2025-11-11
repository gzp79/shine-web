import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, SvelteRenderer } from '@storybook/sveltekit';
import '../src/app.css';

// Override app.css styles that break Storybook scrolling
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        body, #storybook-root {
            overflow: auto !important;
            height: auto !important;
        }
    `;
    document.head.appendChild(style);
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        },

        options: {
            storySort: {
                order: ['Atoms', ['Theme', 'Layouts', 'Inputs', 'Examples']]
            }
        }
    },
    decorators: [
        withThemeByDataAttribute<SvelteRenderer>({
            themes: {
                light: 'light',
                dark: 'dark',
                system: ''
            },
            defaultTheme: 'light',
            attributeName: 'data-theme'
        })
    ]
};

export default preview;
