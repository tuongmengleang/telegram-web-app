export function setupEruda() {
    if (process.env.NODE_ENV !== 'production') {
        import('eruda').then((eruda) => {
            eruda.init();
        });
    }
}
