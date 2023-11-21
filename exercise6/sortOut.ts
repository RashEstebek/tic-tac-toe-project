// const groups = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
const groups = ["1", "2", "3", "4", "5", "6", "7", "8"];

const participants = [
  "Gulfia",
  "Kanat",
  "Rash",
  "Alisher",
  "Samat",
  "Kuanyshbek",
  "Bibigul",
  "Yerzhan",
  "Beksultan",
  "Danial",
  "Zarina",
  "Aituar",
  "Duman",
  "Kazybek",
  "Ilyas",
  "Daniyar",
  "Yedil",
  "Anastasia",
];

function sortOut() {
  const randomParticipants = randomize(participants);
  const groupsWithParticipants = sortToGroups(groups, randomParticipants);

  console.log(
    groupsWithParticipants
      .map(({ name, participants }) => `${name}: ${participants.join(", ")}`)
      .join("\n")
  );
}

function randomize(strs: string[]) {
  const randomParticipants = [];
  let newParticipants = [...strs];

  while (newParticipants.length > 0) {
    const ind = getRandomInt(newParticipants.length);
    randomParticipants.push(newParticipants[ind]);
    newParticipants = [
      ...newParticipants.slice(0, ind),
      ...newParticipants.slice(ind + 1),
    ];
  }

  return randomParticipants;
}

function sortToGroups(groups: string[], participants: string[]) {
  const sorted = groups.map<{ name: string; participants: string[] }>(
    (group) => ({ name: group, participants: [] })
  );

  for (let i = 0; i < participants.length; i++) {
    const ind = i % groups.length;
    sorted[ind].participants.push(participants[i]);
  }

  return sorted;
}

function getRandomInt(max: number) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max); // The maximum is exclusive
}

sortOut();
