function ClozeCard(text, cloze){
  this.text = text;
  this.cloze = cloze;
  this.partial = this.text.replace(cloze, '...');
}

module.exports = ClozeCard;