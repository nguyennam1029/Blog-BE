export const generateCode = (value) => {
    let output = '';
    value = value.normalize("NFD").replace(/[u0200-\u036f]/g, '').split(' ').forEach(item => {
        output+= item.charAt(0) + item.charAt(1);
    });
    return output.toUpperCase() + value.length;
}