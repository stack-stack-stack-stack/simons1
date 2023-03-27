export const openWindow = ({ url, identifierName, width, height }) => {
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const target = window.open(url, identifierName, `status=no, width=${width}, height=${height}, left=${left}, top=${top}, All=no, resizable=no, menubar=no, toolbars=no`);
    if (target) {
        target.resizeTo(width, height);
        target.onresize = (_ => {
            target.resizeTo(width, height);
        });
    }
    return target;
};
//# sourceMappingURL=openWindow.js.map