module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    safelist: [{ pattern: /gap-/ }, { pattern: /p-/ }, { pattern: /max-w-/ }, { pattern: /max-h-/ }, { pattern: /w-/ }, { pattern: /h-/ }],
    theme: {
        extend: {
            colors: {
                'border-gray': '#3e3f40',
            },
        },
    },
    variants: {
        extend: {},
    },
    daisyui: {
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        themes: [
            {
                light: {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/colors/themes')['[data-theme=light]'],
                    primary: '#314EF3',
                    'primary-focus': '#263DBC',
                    'primary-content': '#FBFCFC',
                    secondary: '#080A4B',
                    'secondary-focus': '#05072B',
                    'secondary-content': '#FBFCFC',
                    accent: '#AFFB9E',
                    'accent-focus': '#86E172',
                    'accent-content': '#080A4B',
                    neutral: '#3E3F40',
                    'neutral-focus': '#191919',
                    'neutral-content': '#FBFCFC',
                    'base-100': '#FBFCFC',
                    'base-200': '#E9EEF0',
                    'base-300': '#D4D9DB',
                    'base-content': '#191919',
                    info: '#33C6DA',
                    'info-content': '#080A4B',
                    success: '#77E5B5',
                    'success-content': '#080A4B',
                    warning: '#F6EA76',
                    'warning-content': '#080A4B',
                    error: '#E57777',
                    'error-content': '#080A4B',
                },
                dark: {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
                    primary: '#314EF3',
                    'primary-focus': '#263DBC',
                    'primary-content': '#FBFCFC',
                    secondary: '#1990F9',
                    'secondary-focus': '#0081F2',
                    'secondary-content': '#FBFCFC',
                    accent: '#AFFB9E',
                    'accent-focus': '#86E172',
                    'accent-content': '#080A4B',
                    neutral: '#3E3F40',
                    'neutral-focus': '#191919',
                    'neutral-content': '#FBFCFC',
                    'base-100': '#040527',
                    'base-200': '#281C6D',
                    'base-300': '#080A4B',
                    'base-content': '#FBFCFC',
                    info: '#33C6DA',
                    'info-content': '#080A4B',
                    success: '#77E5B5',
                    'success-content': '#080A4B',
                    warning: '#F6EA76',
                    'warning-content': '#080A4B',
                    error: '#E57777',
                    'error-content': '#080A4B',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
