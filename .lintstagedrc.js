function canLint(filename) {
  return !(
    filename.endsWith('.css') ||
    filename.endsWith('.scss') ||
    filename.endsWith('.md')
  );
}

module.exports = {
  "web/src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": filenames => {
    const lintable = filenames.filter(canLint).join(' ');
    const onlyPretty = filenames.filter(f => !canLint(f)).join(' ');

    return [
      `eslint ${lintable} --fix`,
      `prettier --write ${onlyPretty}`,
    ];
  },
};
