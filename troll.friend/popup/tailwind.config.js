module.exports = {
    prefix: '',
    mode: 'jit',
    darkMode: 'class',
    plugins: [],
    corePlugins: {preflight: true},
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    presets: [require('@stone-payments/infinity/dist/tailwind.config')],
}
