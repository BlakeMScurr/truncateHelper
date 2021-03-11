var stdin = process.openStdin();
var data = "";
stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', function() {
  let min = parseInt(process.argv[2])
  let max = parseInt(process.argv[3])

  let words = data.split("\r\n");
  let wordsByLen = []
  for (let wordLen = min; wordLen <= max; wordLen++) {
    let x = words.filter((word) => {
      return word.length === wordLen
    })
    wordsByLen[wordLen] = x
  }

  recurse("", min, min, max, [], wordsByLen)
});

function recurse(prefix, l, min, max, stacks, wordsByLen) {
  if (l > max) return
  stacks[l-min] = [...wordsByLen[l]]
  if (prefix !== "") stacks[l-min] = stacks[l-min].filter(w => { return w.endsWith(prefix) })

  while (stacks[l-min].length > 0) {
    if (l === max) console.log(stacks.map((s) => {return s[0]}).join(" "))
    recurse(stacks[l-min][0], l + 1, min, max, stacks, wordsByLen)
    stacks[l-min].shift()
  }
}
