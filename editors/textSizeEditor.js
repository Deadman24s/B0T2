module.exports = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    do {
      context.font = `bold ${fontSize -= 10}pt Arial`;
    } while (context.measureText(text).width > canvas.width - 300);
    return context.font;
  }