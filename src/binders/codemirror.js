import CodeMirror from 'codemirror';

export default function codeMirrorBinder(config) {
    let instance;
    let changeCallback;

    return {
        on(callback) {
            changeCallback = callback;
            instance.on('change', changeCallback);
        },
        getValue() {
            instance.save();
            return instance.getValue();
        },
        setValue(value) {
            instance.setValue(value);
            instance.save();
        },
        initialize() {
            instance = CodeMirror.fromTextArea(this, config);
        },
        destroy() {
            instance.off('change', changeCallback);
            instance.toTextArea();
        }
    }
}
