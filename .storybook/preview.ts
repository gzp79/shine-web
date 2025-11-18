import type { Preview } from '@storybook/sveltekit';
import { type Theme, themeList } from '@lib/theme/theme.svelte';
import '../src/app.css';
import { i18n } from '../src/lib/i18n/i18n';
import lang from '../src/translations/lang.json';

i18n.loadTranslations('en', '/');

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
                order: [
                    'Atoms',
                    [
                        'Theme',
                        ['Typography', 'Colors', 'Icons'],
                        'Layouts',
                        ['Box', 'Stack', 'Grid', 'Card', 'Popper', 'Modal'],
                        'Inputs',
                        ['Button', 'ImageButton', 'Toggle', 'TextArea', 'ValidatedTextArea', 'ComboButton'],
                        'Data',
                        ['ProgressBar', 'PropertyList'],
                        'Examples'
                    ],
                    'Components',
                    ['App', 'Alert', 'LoadingCard', 'ErrorCard'],
                    'Features',
                    ['Account', ['CurrentUserCard', 'ActiveSessionCard', 'ActiveTokenCard', 'LinkedIdentityCard']]
                ]
            }
        }
    },
    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            defaultValue: 'en',
            toolbar: {
                icon: 'globe',
                items: Object.entries(lang).map(([code, name]) => ({
                    value: code,
                    title: name
                })),
                showName: true,
                dynamicTitle: true
            }
        },
        theme: {
            description: 'Theme',
            defaultValue: 'system',
            toolbar: {
                icon: 'mirror',
                items: themeList.map((t) => ({
                    value: t,
                    title: t.charAt(0).toUpperCase() + t.slice(1)
                })),
                showName: true,
                dynamicTitle: true
            }
        }
    },
    decorators: [
        (story, context) => {
            // Handle locale changes
            const locale = context.globals.locale || 'en';
            i18n.setLocale(locale);
            i18n.loadTranslations(locale, '/');

            // Handle theme changes
            const selectedTheme = (context.globals.theme || 'system') as Theme;
            if (typeof document !== 'undefined') {
                if (selectedTheme === 'system') {
                    document.documentElement.removeAttribute('data-theme');
                } else {
                    document.documentElement.setAttribute('data-theme', selectedTheme);
                }

                const docsStories = document.querySelectorAll('.docs-story');
                docsStories.forEach((element) => {
                    element.classList.add('bg-surface');
                });
            }

            return story();
        }
    ]
};

export default preview;
