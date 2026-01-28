import type { Riddle } from "../models/riddle";

export const ultimateRiddleCollection: {
  metadata: {
    totalRiddles: number;
    sources: string[];
    generatedAt: string;
    version: string;
  };
  riddles: Omit<Riddle, "categories" | "source">[];
} = {
  metadata: {
    totalRiddles: 500,
    sources: ["ultimate-riddles-collection"],
    generatedAt: "2026-01-20T17:20:17.079Z",
    version: "1.0.0",
  },
  riddles: [
    {
      id: "ultimate-collection-1",
      text: "One strand dangles. Two strands twist. Three or more can fashion this.",
      textHe: "חוט אחד משתלשל. שני חוטים מתפתלים. שלושה או יותר יכולים ליצור את זה.",
      solution: "Braids",
      solutionHe: "צמות",
    },
    {
      id: "ultimate-collection-2",
      text: "A home of wood in a wooded place, but built not by hand. High above the earthen ground, it holds its pale blue gems. What is it?",
      textHe: "בית עץ במקום מיוער, אך לא נבנה ביד. גבוה מעל האדמה, הוא מחזיק אבני חן כחולות חיוורות. מה זה?",
      solution: "A nest",
      solutionHe: "קן",
    },
    {
      id: "ultimate-collection-3",
      text: "Three or four, I can stab through or rule the seas. You know my cousins. What am I?",
      textHe: "שלוש אוארבע, אני יכול לדקור או לשלוט בימים. אתה מכיר את בני הדודים שלי. מה אני?",
      solution: "Fork",
      solutionHe: "מזלג",
    },
    {
      id: "ultimate-collection-4",
      text: "What can be swallowed, but can swallow you?",
      textHe: "מה ניתן לבלוע, אך יכול לבלוע אותך?",
      solution: "Pride",
      solutionHe: "גאווה",
    },
    {
      id: "ultimate-collection-5",
      text: "Guided, I am scraping along, leaving behind my snow-white dust against that which I am scraping, for when I am scraping, I must.",
      textHe: "מונחה, אני מתגרד לאורך, משאיר מאחורי את האבק הלבן כשלג שלי על זה שאני מתגרד בו, כי כאשר אני מתגרד, אני חייב.",
      solution: "Chalk",
      solutionHe: "גיר",
    },
    {
      id: "ultimate-collection-6",
      text: "What word of five letters has only one left when two letters are removed?",
      textHe: "איזו מילה בת חמש אותיות נשארת רק אחת כשמסירים שתי אותיות?",
      solution: "A stone",
      solutionHe: "אבן (stone)",
    },
    {
      id: "ultimate-collection-7",
      text: "What gets easier to pick up the larger it gets?",
      textHe: "מה נעשה קל יותר להרים ככל שהוא נעשה גדול יותר?",
      solution: "A woman",
      solutionHe: "אישה",
    },
    {
      id: "ultimate-collection-8",
      text: "You can tumble in it, Roll in it, Burn it, Animals eat it, Used to cover floors, Still used beyond stall doors. Freshens whatever it is placed on, Absorbs whatever is poured into it. What is it?",
      textHe: "אתה יכול להתהפך בזה, להתגלגל בזה, לשרוף אותו, בעלי חיים אוכלים אותו, משמש לכיסוי רצפות, עדיין משמש מעבר לדלתות דוכנים. מרענן כל מה שהוא מונח עליו, סופג כל מה שנשפך לתוכו. מה זה?",
      solution: "Hay",
      solutionHe: "חציר",
    },
    {
      id: "ultimate-collection-9",
      text: "What's red and bad for your teeth?",
      textHe: "מה אדום ורע לשיניים שלך?",
      solution: "A brick",
      solutionHe: "לבנה",
    },
    {
      id: "ultimate-collection-10",
      text: "What kind of cup doesn't hold water?",
      textHe: "איזה סוג של כוס לא מחזיק מים?",
      solution: "Cupcake",
      solutionHe: "קאפקייק",
    },
    {
      id: "ultimate-collection-11",
      text: "Two bodies with ribs, exposed.",
      solution: "Ladder",
    },
    {
      id: "ultimate-collection-12",
      text: "Tear one off and scratch my head, what once was red is black instead!",
      solution: "A match",
    },
    {
      id: "ultimate-collection-13",
      text: "Precious stones in a pack of cards.",
      solution: "Diamonds",
    },
    {
      id: "ultimate-collection-14",
      text: "When young, I am sweet in the sun. When middle-aged, I make you gay. When old, I am valued more than ever.",
      solution: "Wine",
    },
    {
      id: "ultimate-collection-15",
      text: "What's the red stuff between elephant's toes?",
      solution: "Slow pygmies",
    },
    {
      id: "ultimate-collection-16",
      text: "Take away my first letter and I remain the same. Take away my last letter and I remain unchanged. Remove all my letters and I'm still me. What am I?",
      solution: "A mailman",
    },
    {
      id: "ultimate-collection-17",
      text: "He has one and a person has two, a citizen has three and a human being has four, a personality has five and an inhabitant of earth has six. What am I?",
      solution: "Syllables",
    },
    {
      id: "ultimate-collection-18",
      text: "I follow the orders of only two. I respect the work of only two. I am in constant battles with many, Though one surpassed them all. With forces joined, We created hell, Until our mutual enemy fell. Who am I?",
      solution: "Peeves",
    },
    {
      id: "ultimate-collection-19",
      text: "What is it that leaps and runs and yet, has no feet?",
      solution: "A ball",
    },
    {
      id: "ultimate-collection-20",
      text: "I love to dance and twist and prance, I shake my tail, as away I sail, wingless I fly into the sky. What am I?",
      solution: "A kite",
    },
    {
      id: "ultimate-collection-21",
      text: "Travel a mile and I will change, travel a million and I will end as I started, What am I?",
      solution: "An odometer",
    },
    {
      id: "ultimate-collection-22",
      text: "At the sound of me, men may dream Or stamp their feet At the sound of me, women may laugh Or sometimes weep.",
      solution: "Music",
    },
    {
      id: "ultimate-collection-23",
      text: "Large as a mountain, small as a pea, Endlessly swimming in a waterless sea.",
      solution: "Asteroids",
    },
    {
      id: "ultimate-collection-24",
      text: "What is the end to which we all like to come?",
      solution: "Dividend",
    },
    {
      id: "ultimate-collection-25",
      text: "There is a clerk at the butcher shop, he is five feet ten inches tall, and he wears size 13 sneakers. What does he weigh?",
      solution: "Meat",
    },
    {
      id: "ultimate-collection-26",
      text: "A child playing on the beach had 6-1/6 sand piles in one place and 3-1/3 in another. If he put them together, how many sand piles would he have?",
      solution: "One big pile",
    },
    {
      id: "ultimate-collection-27",
      text: "A serpent swam in a silver urn, A golden bird did in its mouth abide, The serpent drank the water, this in turn, Killed the serpent. Then the gold bird died.",
      solution: "An oil lamp",
    },
    {
      id: "ultimate-collection-28",
      text: "When is 1500 plus 20 and 1600 minus 40 the same thing?",
      solution: "Military time",
    },
    {
      id: "ultimate-collection-29",
      text: "In ye fire thou hear me scream! Creaking and whining yet I am dead before thoust layeth me upon ye hearth.",
      solution: "Log",
    },
    {
      id: "ultimate-collection-30",
      text: "What starts with a P, ends with an E and has a million letters in it?",
      solution: "Post-Office",
    },
    {
      id: "ultimate-collection-31",
      text: "I have no wings but I fly, I have no teeth but I bite. What am I?",
      solution: "A bullet",
    },
    {
      id: "ultimate-collection-32",
      text: "I know a thousand faces, and count the tailed heads, feasting bright upon the eyes, of many who have died. Wielding well a mighty power, who hath but humble stature. Masses fall upon their knees, to scarce behold my only side. What am I?",
      solution: "A coin",
    },
    {
      id: "ultimate-collection-33",
      text: "A blue house has blue bricks; a yellow house has a yellow bricks. What is a green house made of?",
      solution: "Glass",
    },
    {
      id: "ultimate-collection-34",
      text: "What do we all put off until tomorrow?",
      solution: "Our clothes",
    },
    {
      id: "ultimate-collection-35",
      text: "What type of dress can never be worn?",
      solution: "Address",
    },
    {
      id: "ultimate-collection-36",
      text: "What has one eye but cannot see?",
      solution: "A needle",
    },
    {
      id: "ultimate-collection-37",
      text: "My father have a grey horse in him yard, ride him nowhere but on him tail.",
      solution: "Pipe",
    },
    {
      id: "ultimate-collection-38",
      text: "I'm round at the ends and high in the middle. What am I?",
      solution: "Ohio",
    },
    {
      id: "ultimate-collection-39",
      text: "If I have it, I don't share it. If I share it, I don't have it. What is it?",
      solution: "A Secret",
    },
    {
      id: "ultimate-collection-40",
      text: "More precious than gold, but cannot be bought, Can never be sold, only earned if it's sought, If it is broken it can still be mended, At birth it can't start nor by death is it ended.",
      solution: "Friendship",
    },
    {
      id: "ultimate-collection-41",
      text: "I don't have eyes, but once I did see. Once I had thoughts, but now I'm white and empty.",
      solution: "Skull",
    },
    {
      id: "ultimate-collection-42",
      text: "I am a strong as ten men Yet ten men cannot stand me up. What am I?",
      solution: "Water",
    },
    {
      id: "ultimate-collection-43",
      text: "I'm where yesterday follows today and tomorrow is in the middle. What am I?",
      solution: "A dictionary",
    },
    {
      id: "ultimate-collection-44",
      text: "You will always find me in the past. I can be created in the present, But the future can never taint me. What am I?",
      solution: "History",
    },
    {
      id: "ultimate-collection-45",
      text: "What is so delicate that even mentioning it breaks it?",
      solution: "Silence",
    },
    {
      id: "ultimate-collection-46",
      text: "I'm a bearer of darkness. I'm feared and often hated. I'm a symbol of the unwanted, An omen that leaves you jaded. Some people can predict my coming, But then you'll forever see Things lurking around corners… Are you sure that it was me?",
      solution: "Grim",
    },
    {
      id: "ultimate-collection-47",
      text: "What is it that no man wants, but no man wants to lose?",
      solution: "A lawsuit",
    },
    {
      id: "ultimate-collection-48",
      text: "A couple sharing five a piece, Stretching, spreading, loudly meet, We are known to often calm, And yet were better known to harm, To help and build, our team of ten, Connects us to the minds of men. What are we?",
      solution: "Hands and fingers",
    },
    {
      id: "ultimate-collection-49",
      text: "Although I'm not an insect, some people found me very difficult to exterminate. They called me something like 'insane priest.' The first half of my name means the same as 'scrape,' & my last three letters are a metal. Who am I?",
      solution: "I'm Rasputin",
    },
    {
      id: "ultimate-collection-50",
      text: "What has a head, a tail, is brown, and has no legs?",
      solution: "A penny",
    },
    {
      id: "ultimate-collection-51",
      text: "I can be long, or I can be short. I can be grown, and I can be bought. I can be painted, or left bare. I can be round, or square. What am I?",
      solution: "Your fingernails",
    },
    {
      id: "ultimate-collection-52",
      text: "It can be cracked, It can be made, It can be told, it can be played. What is it?",
      solution: "A joke",
    },
    {
      id: "ultimate-collection-53",
      text: "I only have one entrance, but you can come out with three exits. What am I?",
      solution: "A blouse",
    },
    {
      id: "ultimate-collection-54",
      text: "A sugarcane without joints, whose leaves reach heaven.",
      solution: "Prayer",
    },
    {
      id: "ultimate-collection-55",
      text: "If a green man lives in a green house, a purple man lives in a purple house, a blue man lives in a blue house, a yellow man lives in a yellow house, a black man lives in a black house. Who lives in a White house?",
      solution: "The President",
    },
    {
      id: "ultimate-collection-56",
      text: "I am something that floats. But after a period of time I fall.",
      solution: "A balloon",
    },
    {
      id: "ultimate-collection-57",
      text: "I have a thing, which I twine and twine and it is covered.",
      solution: "Weaving spool",
    },
    {
      id: "ultimate-collection-58",
      text: "A man in prison has a visitor. Afterward a guard asks the inmate who the visitor was to him. The inmate replies: brothers and sisters I have none, but that man's father is my father's son. Who was the visitor to the inmate?",
      solution: "His son",
    },
    {
      id: "ultimate-collection-59",
      text: "My sides are firmly laced about, Yet nothing is within; You'll think my head is strange indeed, Being nothing else but skin.",
      solution: "A drum",
    },
    {
      id: "ultimate-collection-60",
      text: "Tool of thief, toy of queen. Always used to be unseen. Sign of joy, sign of sorrow. Giving all likeness borrowed.",
      solution: "Mask",
    },
    {
      id: "ultimate-collection-61",
      text: "Why is the math book sad?",
      solution: "It has problems",
    },
    {
      id: "ultimate-collection-62",
      text: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost everybody.",
      solution: "Pencil lead",
    },
    {
      id: "ultimate-collection-63",
      text: "Above the kingdom I reign, Spotted, speckled, with a mane, I travel in packs, And if you're lucky, you'd ride me. What am I?",
      solution: "Giraffe",
    },
    {
      id: "ultimate-collection-64",
      text: "I have a thousand wheels, but move I do not. Call me what I am, call me a lot.",
      solution: "Parking lot",
    },
    {
      id: "ultimate-collection-65",
      text: "There is a kind of fish that can never swim. What is that?",
      solution: "Dead fish",
    },
    {
      id: "ultimate-collection-66",
      text: "Some are quick to take it. Others must be coaxed. Those who choose to take it gain and lose the most.",
      solution: "Risk",
    },
    {
      id: "ultimate-collection-67",
      text: "Journey without it and you will never prevail, but if you have too much of it you will surely fail.",
      solution: "Confidence",
    },
    {
      id: "ultimate-collection-68",
      text: "What is put on a table, cut, but never eaten?",
      solution: "Cards",
    },
    {
      id: "ultimate-collection-69",
      text: "Early ages the iron boot tread, With Europe at her command. Through time power slipped and fled, 'til the creation of new holy land. Who am I?",
      solution: "Rome Italy",
    },
    {
      id: "ultimate-collection-70",
      text: "What takes hours to pull off Is most satisfying when it's done And requires consent from the person you're doing it to?",
      solution: "Hypnotism",
    },
    {
      id: "ultimate-collection-71",
      text: "What English word retains the same pronunciation, even after you take away four of its five letters?",
      solution: "Queue",
    },
    {
      id: "ultimate-collection-72",
      text: "People buy me to eat, but never eat me. What am I?",
      solution: "A plate",
    },
    {
      id: "ultimate-collection-73",
      text: "With head without hair. With mouth without tooth.",
      solution: "A bottle",
    },
    {
      id: "ultimate-collection-74",
      text: "I cannot be other than what I am, Until the man who made me dies, Power and glory will fall to me finally, Only when he last closes his eyes.",
      solution: "A prince",
    },
    {
      id: "ultimate-collection-75",
      text: "A way to say boring, minus the dane. Scat. Use, minus the e. Who am I?",
      solution: "Mundugus",
    },
    {
      id: "ultimate-collection-76",
      text: "What always goes to bed with its shoes on?",
      solution: "A horse",
    },
    {
      id: "ultimate-collection-77",
      text: "Lovely and round, I shine with pale light, Grown in the darkness, a lady's delight.",
      solution: "Pearl",
    },
    {
      id: "ultimate-collection-78",
      text: "We travel much, yet prisoners are, and close confined to boot. Yet with any horse, we will keep the pace, and will always go on foot. What are they?",
      solution: "Spurs",
    },
    {
      id: "ultimate-collection-79",
      text: "Black we are and much admired, Men seek us if they are tired, We tire the horse, comfort man, Guess this riddle if you can.",
      solution: "Coal",
    },
    {
      id: "ultimate-collection-80",
      text: "I can be as thin as a picture frame but my insides have many things you can see.",
      solution: "Television",
    },
    {
      id: "ultimate-collection-81",
      text: "Samuel was out for a walk and it started to rain. He did not have an umbrella and he wasn't wearing a hat. His clothes were soaked, yet not a single hair on his head got wet. How could this be?",
      solution: "Samuel was bald",
    },
    {
      id: "ultimate-collection-82",
      text: "I have an eye but cannot see. I'm faster than any man alive and have no limbs. What am I?",
      solution: "A hurricane",
    },
    {
      id: "ultimate-collection-83",
      text: "I come in many colors, some are blue and white. While some people annoy me, I am not much for the fight. I live where people rarely tread, but you will find me close to bed. What am I?",
      solution: "Whales",
    },
    {
      id: "ultimate-collection-84",
      text: "Round as an apple, deep as a cup, and all the kings' horses can't fill it up. What is it?",
      solution: "A well",
    },
    {
      id: "ultimate-collection-85",
      text: "As I went through the garden gap, Who should I meet but Dick Red-cap! A stick in his hand, a stone in his throat, If you'll tell me this riddle, I'll give you a groat.",
      solution: "A cherry",
    },
    {
      id: "ultimate-collection-86",
      text: "A man stands outside in the rain. He has no hat, raincoat, or umbrella. His clothes are soaked, but his hair isn't wet. How is this possible?",
      solution: "Heisbald",
    },
    {
      id: "ultimate-collection-87",
      text: "I have hands that wave you, though I never say goodbye. It's cool for you to be with me, especially when I say HI. What am I?",
      solution: "An electric fan",
    },
    {
      id: "ultimate-collection-88",
      text: "What has a big mouth, yet never speaks?",
      solution: "A jar",
    },
    {
      id: "ultimate-collection-89",
      text: "I have a pet, his body is full of coins",
      solution: "A piggy bank",
    },
    {
      id: "ultimate-collection-90",
      text: "Everyone has me but nobody can lose me. What am I?",
      solution: "A shadow",
    },
    {
      id: "ultimate-collection-91",
      text: "What is lengthened by being cut at both ends?",
      solution: "A ditch",
    },
    {
      id: "ultimate-collection-92",
      text: "I dig out tiny caves, and store gold and silver in them. I also build bridges of silver and make crowns of gold. They are the smallest you could imagine. Sooner or later everybody needs my help, yet many people are afraid to let me help them. Who am I?",
      solution: "Dentist",
    },
    {
      id: "ultimate-collection-93",
      text: "In the night a mountain in the morning a meadow. What am I?",
      solution: "A bed",
    },
    {
      id: "ultimate-collection-94",
      text: "A mile from end to end, yet as close to as a friend. A precious commodity, freely given. Found on the rich, poor, short and tall, but shared among children most of all. What is it?",
      solution: "A smile",
    },
    {
      id: "ultimate-collection-95",
      text: "I have seven letters and am something you eat. My only anagram can help your pain. If you remove my first 2 letters I wear things down. Removing my first 3 letters is an adjective and removing my first 4 letters leaves a measure of time. What am I?",
      solution: "Sausage",
    },
    {
      id: "ultimate-collection-96",
      text: 'If I say, "Everything I tell you is a lie", am I telling you the truth or a lie?',
      solution: "Paradox",
    },
    {
      id: "ultimate-collection-97",
      text: "A grain of rice that occupies the entire house",
      solution: "Light bulb",
    },
    {
      id: "ultimate-collection-98",
      text: "Squishes, Squashes, Wishes I washes, Can get it in my hair, Makes me not look too fair.",
      solution: "Mud",
    },
    {
      id: "ultimate-collection-99",
      text: "Can you think of a crime that is punishable if attempted but not punishable is actually committed?",
      solution: "Suicide",
    },
    {
      id: "ultimate-collection-100",
      text: "Which bird in this world flies yet suckles its young?",
      solution: "Fruit bat",
    },
    {
      id: "ultimate-collection-101",
      text: "What lies in bed, and stands in bed? First white then red. The plumper it gets the better the old women like it?",
      solution: "A strawberry",
    },
    {
      id: "ultimate-collection-102",
      text: "There is bomb on top of a computer; around the computer are a hairbrush, keys, phone and a cup. When the explosion comes, what item destroyed first?",
      solution: "The bomb",
    },
    {
      id: "ultimate-collection-103",
      text: "In the sky it roams, As a dark cloud in the sky, Yet much faster, And not when nearby.",
      solution: "Swarm of birds",
    },
    {
      id: "ultimate-collection-104",
      text: "I have Eighty-eight keys but cannot open a single door? What am I?",
      solution: "A piano",
    },
    {
      id: "ultimate-collection-105",
      text: "What's that 7 letter word with thousands of letters in it?",
      solution: "A mailbox",
    },
    {
      id: "ultimate-collection-106",
      text: "What makes a loud noise when changing its jacket, becomes larger but weighs less?",
      solution: "Popcorn",
    },
    {
      id: "ultimate-collection-107",
      text: "If you eat me, my sender will eat you. What am I?",
      solution: "A fishhook",
    },
    {
      id: "ultimate-collection-108",
      text: "I have no brain but am still smarter than the average human. What am I?",
      solution: "Calculator",
    },
    {
      id: "ultimate-collection-109",
      text: "When pronounced, it sounds nothing like the word.",
      solution: "A sentence",
    },
    {
      id: "ultimate-collection-110",
      text: "What grows in winter, dies in summer, and grows roots upward?",
      solution: "An icicle",
    },
    {
      id: "ultimate-collection-111",
      text: "Whoever makes it, tells it not. Whoever takes it, knows it not. Whoever knows it, wants it not. What is it?",
      solution: "Counterfeit money",
    },
    {
      id: "ultimate-collection-112",
      text: "A hill full, a hole full; yet you cannot catch a bowl full. What is it?",
      solution: "A mist",
    },
    {
      id: "ultimate-collection-113",
      text: "I'm not the sort that's eaten, I'm not the sort you bake, Don't put me in an oven; I don't taste that great, But when applied correctly, around me you will find, Problems are so simple when my digits come to mind.",
      solution: "Pi (3.14)",
    },
    {
      id: "ultimate-collection-114",
      text: "What has 4 eyes but can't see.",
      solution: "Mississippi",
    },
    {
      id: "ultimate-collection-115",
      text: "I don't exist unless you cut me, but if you stab me I won't bleed. I hate no one yet am abhorred by all. What am I?",
      solution: "A fart",
    },
    {
      id: "ultimate-collection-116",
      text: "I have many ears, this may be true But no matter how you shout, I'll never hear you. What am I?",
      solution: "Cornfield",
    },
    {
      id: "ultimate-collection-117",
      text: "A father's child, a mother's child, yet no one's son.",
      solution: "Daughter",
    },
    {
      id: "ultimate-collection-118",
      text: "A leathery snake, With a stinging bite, I'll stay coiled up, Unless I must fight.",
      solution: "A whip",
    },
    {
      id: "ultimate-collection-119",
      text: "With me you are blind, To others and what they are, Over me you cannot see, Even though I'm in your head, I am full of myself, I think I'm better than you, I'm a horrible thing to be, Can you tell me, What am I?",
      solution: "Ignorance",
    },
    {
      id: "ultimate-collection-120",
      text: "What jumps when it walks and sits when it stands?",
      solution: "A kangaroo",
    },
    {
      id: "ultimate-collection-121",
      text: "Never ahead, ever behind, Yet flying swiftly past; For a child I last forever, For adults I'm gone too fast.",
      solution: "Childhood",
    },
    {
      id: "ultimate-collection-122",
      text: "What has wings, but can not fly. Is enclosed, but can outside also lie. Can open itself up, Or close itself away. Is the place of kings and queens, And doggerel of every means. What is it upon which I stand? Which can lead us to different lands.",
      solution: "A stage",
    },
    {
      id: "ultimate-collection-123",
      text: "Without a bridle, or a saddle, across a thing I ride a-straddle. And those I ride, by help of me, though almost blind, are made to see. What am I?",
      solution: "Spectacles",
    },
    {
      id: "ultimate-collection-124",
      text: "What gets whiter the dirtier that it gets?",
      solution: "A chalkboard",
    },
    {
      id: "ultimate-collection-125",
      text: "I have a mouth on my head and eat everything. What am I?",
      solution: "A backpack",
    },
    {
      id: "ultimate-collection-126",
      text: "What do people want the least on their hands?",
      solution: "Handcuffs",
    },
    {
      id: "ultimate-collection-127",
      text: "First you see me in the grass dressed in yellow gay; next I am in dainty white, then I fly away. What am I?",
      solution: "A dandelion",
    },
    {
      id: "ultimate-collection-128",
      text: "What goes in the water black and comes out red?",
      solution: "A lobster",
    },
    {
      id: "ultimate-collection-129",
      text: "Thousands of these come together to make a digital image. What is it?",
      solution: "Pixel",
    },
    {
      id: "ultimate-collection-130",
      text: "What English word has three consecutive double letters?",
      solution: "Bookkeeper",
    },
    {
      id: "ultimate-collection-131",
      text: "We are five little objects of an everyday sort, You will find us all in a tennis court.",
      solution: "Vowels",
    },
    {
      id: "ultimate-collection-132",
      text: "Sometimes I am light, sometimes I am dark. What am I?",
      solution: "Chocolate",
    },
    {
      id: "ultimate-collection-133",
      text: "A three-letter word I'm sure you know, I can be on a boat or a sleigh in the snow, I'm pals with the rain and honor a king, But my favorite use is attached to a string. What am I?",
      solution: "A bow",
    },
    {
      id: "ultimate-collection-134",
      text: "Twigs but no roots leaves but no shoots; Faring forever over the sand. Filmmakers love me But ranchers, they hate me. I came here from Russia Isn't life grand?",
      solution: "Russian Thistle",
    },
    {
      id: "ultimate-collection-135",
      text: "I never ask questions, but always answered. What am I?",
      solution: "A doorbell",
    },
    {
      id: "ultimate-collection-136",
      text: "When the creeper passes, all the grass kneels.",
      solution: "Plow",
    },
    {
      id: "ultimate-collection-137",
      text: "Your reflection can be seen here, as long as you're not moving.",
      solution: "Water",
    },
    {
      id: "ultimate-collection-138",
      text: "What type of house weighs the least?",
      solution: "A lighthouse",
    },
    {
      id: "ultimate-collection-139",
      text: "Of these things - I have two. One for me - and one for you. And when you ask about the price, I simply smile and nod twice.",
      solution: "Sharing",
    },
    {
      id: "ultimate-collection-140",
      text: "Though I should be unique, you've made most of us the same. I would be stronger, if my characters were stranger.",
      solution: "A password",
    },
    {
      id: "ultimate-collection-141",
      text: "Big as a biscuit, deep as a cup, but even a river can't fill it up. What is it?",
      solution: "A strainer",
    },
    {
      id: "ultimate-collection-142",
      text: "I ate one and threw away two.",
      solution: "Oyster",
    },
    {
      id: "ultimate-collection-143",
      text: "A harvest sown and reaped on the same day In an unplowed field, Which increases without growing, Remains whole though it is eaten Within and without, Is useless and yet The staple of nations.",
      solution: "War",
    },
    {
      id: "ultimate-collection-144",
      text: "A long snake that smokes. What am I?",
      solution: "Train",
    },
    {
      id: "ultimate-collection-145",
      text: "How many months have 28 days?",
      solution: "All of them",
    },
    {
      id: "ultimate-collection-146",
      text: "Who is it that rows quickly with four oars but never comes out under his own roof?",
      solution: "Turtle",
    },
    {
      id: "ultimate-collection-147",
      text: "My first is 3 letters, the mixed around, to make a different, new kind of sound. My second is a word often used to describe something that has an amazing vibe. My third is a number, that part is true. It comes right after zero and right before two. Who am I?",
      solution: "Wonderful",
    },
    {
      id: "ultimate-collection-148",
      text: "I grow for a surface, even if you cut me. I continue to grow even after death.",
      solution: "Hair",
    },
    {
      id: "ultimate-collection-149",
      text: "I am not alive but I grow. I don't have lungs but I need air. What am i?",
      solution: "Fire",
    },
    {
      id: "ultimate-collection-150",
      text: "Not a priest, not a king but wears different kinds of clothes.",
      solution: "Clothesline",
    },
    {
      id: "ultimate-collection-151",
      text: "Blend a teapot shot so the pearlies won't rot!",
      solution: "Toothpaste",
    },
    {
      id: "ultimate-collection-152",
      text: "Walk on the living, they don't even mumble. Walk on the dead, they mutter and grumble",
      solution: "Leaves",
    },
    {
      id: "ultimate-collection-153",
      text: "Today he is there to trip you up and he will torture you tomorrow.",
      solution: "Homework",
    },
    {
      id: "ultimate-collection-154",
      text: "The more you take the more you leave behind.",
      solution: "Footsteps",
    },
    {
      id: "ultimate-collection-155",
      text: "Oh how I love my dancing feet! They stay together - oh so neat. And when I want to walk a line, They all stay together and do double time. I count them up, ten times or more, And race on-off, across the floor.",
      solution: "Centipede",
    },
    {
      id: "ultimate-collection-156",
      text: "What heavy seven letter word can you take two away from and be left with eight?",
      solution: "Weights",
    },
    {
      id: "ultimate-collection-157",
      text: "You use a knife to slice my head and weep beside me when I am dead. What am I?",
      solution: "Onion",
    },
    {
      id: "ultimate-collection-158",
      text: "Ne'er the same, In multitude you see me. You love me, you hate me, What am I? What am I?",
      solution: "People",
    },
    {
      id: "ultimate-collection-159",
      text: "Shorter than my four siblings, but easily the strongest, Sometimes I wear a funny hat.",
      solution: "Thumb",
    },
    {
      id: "ultimate-collection-160",
      text: "I have joy in bringing two together, but darning my existence! My life hangs by a thread, filled with ups, downs and resistance!",
      solution: "Needle",
    },
    {
      id: "ultimate-collection-161",
      text: "What has ten letters and starts with gas?",
      solution: "Automobile",
    },
    {
      id: "ultimate-collection-162",
      text: "Looks like water, but it's heat. Sits on sand, lays on concrete. People have been known, To follow it everywhere. But it gets them no place, And all they can do is stare.",
      solution: "Mirage",
    },
    {
      id: "ultimate-collection-163",
      text: "Flour of England, fruit of Spain, Met together in a shower of rain; Put in a bag tied round with a string, If you'll tell me this riddle, I'll give you a ring.",
      solution: "Plum pudding",
    },
    {
      id: "ultimate-collection-164",
      text: "What is it something that you always have but you always leave behind?",
      solution: "Fingerprints",
    },
    {
      id: "ultimate-collection-165",
      text: "In my place, I am the figure of authority. I housed evil unknowingly. I gave it away to instruction which soon led to the world's destruction. What is my last name?",
      solution: "Pandora",
    },
    {
      id: "ultimate-collection-166",
      text: "Wednesday, Tom and Joe went to a restaurant and ate dinner. When they were done they paid for the food and left. But Tom and Joe didn't pay for the food. Who did?",
      solution: "Wednesday",
    },
    {
      id: "ultimate-collection-167",
      text: "What does an old tan broken down house wear outside?",
      solution: "Address",
    },
    {
      id: "ultimate-collection-168",
      text: "Everyone has it. Those who have it least don't know that they have it. Those who have it most wish they had less of it, But not too little or none at all.",
      solution: "Age",
    },
    {
      id: "ultimate-collection-169",
      text: "Hickory-Dickory-Dock! The mouse ran up the clock. The clock struck one, And down did come. Hickory-Dickory-Dock! What am I?",
      solution: "Mouse",
    },
    {
      id: "ultimate-collection-170",
      text: "What goes through a door but never goes in and never comes out?",
      solution: "Keyhole",
    },
    {
      id: "ultimate-collection-171",
      text: "On the wall, in the air, You just want me out of your hair, Try to catch me, but you cannot, For my vision is thousand fold. What am I?",
      solution: "Fly",
    },
    {
      id: "ultimate-collection-172",
      text: "Iron roof, glass walls, burns and burns and never falls.",
      solution: "Lantern",
    },
    {
      id: "ultimate-collection-173",
      text: "We hurt without moving. We poison without touching. We bear the truth and the lies. We are not to be judged by our size. What are we?",
      solution: "Words",
    },
    {
      id: "ultimate-collection-174",
      text: "I can bring tears to your eyes; resurrect the dead, make you smile, and reverse time. I form in an instant but I last a lifetime. What am I?",
      solution: "Memory",
    },
    {
      id: "ultimate-collection-175",
      text: "Slayer of regrets, old and new, sought by many, found by few.",
      solution: "Redemption",
    },
    {
      id: "ultimate-collection-176",
      text: "You use me for multiple reasons, I am many colored, and many shaped. I may or may not also tell you your sexual preference. What am I?",
      solution: "Flag",
    },
    {
      id: "ultimate-collection-177",
      text: "I build up castles. I tear down mountains. I make some men blind, I help others to see. What am I?",
      solution: "Sand",
    },
    {
      id: "ultimate-collection-178",
      text: "All day long it's in and out. I discharge loads from my shaft. Both men and women go down on me. What am I?",
      solution: "Elevator",
    },
    {
      id: "ultimate-collection-179",
      text: "Two birds, trying to balance in one twig.",
      solution: "Earrings",
    },
    {
      id: "ultimate-collection-180",
      text: "Thousands lay up gold within this house, But no man made it. Spears past counting guard this house, But no man wards it.",
      solution: "Beehive",
    },
    {
      id: "ultimate-collection-181",
      text: "I have one eye, See near and far, I hold the moments you treasure, And the things that make you weep.",
      solution: "Camera",
    },
    {
      id: "ultimate-collection-182",
      text: "When it was young, it had a tail. When it grew up, it had knees.",
      solution: "Frog",
    },
    {
      id: "ultimate-collection-183",
      text: "You'll have me at night and if you remove the first letter I denote the top, such as on a train.",
      solution: "Car",
    },
    {
      id: "ultimate-collection-184",
      text: "Kills the bad ones and the sad ones. Tightens to fit, so one size fits.",
      solution: "Noose",
    },
    {
      id: "ultimate-collection-185",
      text: "Big Square Bag of Mr. Jacob, to use it, you have to turn it upside down.",
      solution: "Pocket",
    },
    {
      id: "ultimate-collection-186",
      text: "Stars awash in a sheen of light, It calls out loud in vile delight. Listeners endure in fright. Vicious brute that reigns at night, Evil whelped of heinous bite, Renewed by wax, it regains might. A leading way to slay the beast, Get the hidden weapon thus released. What is this describing?",
      solution: "Vampire",
    },
    {
      id: "ultimate-collection-187",
      text: "What can you throw but not catch?",
      solution: "A party",
    },
    {
      id: "ultimate-collection-188",
      text: "What does a turkey do when he flies upside down?",
      solution: "Gobbles up",
    },
    {
      id: "ultimate-collection-189",
      text: "What goes in the water red, and comes out black?",
      solution: "Iron",
    },
    {
      id: "ultimate-collection-190",
      text: "What's as small as a mouse but guards a house like a lion?",
      solution: "Lock",
    },
    {
      id: "ultimate-collection-191",
      text: "If a chicken says, all chickens are liars is the chicken telling the truth?",
      solution: "Paradox",
    },
    {
      id: "ultimate-collection-192",
      text: "Fear of what I would become haunted my blood. Both can be seen as a curse Though one is much much worse. It was the luck of the draw, you can say, That I came out this way. So, I guess, with my changing physique, I can be seen as quite unique. Who am I?",
      solution: "Werewolf",
    },
    {
      id: "ultimate-collection-193",
      text: "Begotten, and Born, and dying with Noise, The Terror of Women, and Pleasure of Boys, Like the Fiction of Poets concerning the Wind, I'm chiefly unruly, when strongest confined.",
      solution: "Fart",
    },
    {
      id: "ultimate-collection-194",
      text: "Sharp and long, flag of the world.",
      solution: "Thorn",
    },
    {
      id: "ultimate-collection-195",
      text: "What is something to everybody and nothing to everyone else?",
      solution: "Mind",
    },
    {
      id: "ultimate-collection-196",
      text: "What has a foot but no leg?",
      solution: "Ruler",
    },
    {
      id: "ultimate-collection-197",
      text: "You can't see, you can't touch, and yet you were fascinated by me.",
      solution: "Story",
    },
    {
      id: "ultimate-collection-198",
      text: "Within, I clean all that is bad and is old. I make juice that's the color of gold. Should I die, a filter machine would you need assembled to replace me and beans I resemble.",
      solution: "Kidney",
    },
    {
      id: "ultimate-collection-199",
      text: "I am a seed, three letters in the name, Take away two and I sound quite the same. What am I?",
      solution: "Pea",
    },
    {
      id: "ultimate-collection-200",
      text: "What is never used unless it's in a tight place?",
      solution: "Cork",
    },
    {
      id: "ultimate-collection-201",
      text: "Thirty white horses on a red hill, First they champ, Then they stamp, Then they stand still.",
      solution: "Teeth",
    },
    {
      id: "ultimate-collection-202",
      text: "I can turn into a car, building or even a robot. I'm man made and my siblings and I outnumber you sixty-two to one. My name means, Play well in my creator's native tongue. What am I?",
      solution: "Lego",
    },
    {
      id: "ultimate-collection-203",
      text: "What has feet and legs and nothing else?",
      solution: "Stockings",
    },
    {
      id: "ultimate-collection-204",
      text: "The virgin gave birth to a child and threw away the blanket.",
      solution: "Banana",
    },
    {
      id: "ultimate-collection-205",
      text: "You can only have it once you have given it.",
      solution: "Respect",
    },
    {
      id: "ultimate-collection-206",
      text: "Many have heard me, but nobody has seen me, and I will not speak back until spoken to. What am I?",
      solution: "Echo",
    },
    {
      id: "ultimate-collection-207",
      text: "Although my cow is dead, I still beat her. What a racket she makes!",
      solution: "Drum",
    },
    {
      id: "ultimate-collection-208",
      text: "What asks but never answers?",
      solution: "Owl",
    },
    {
      id: "ultimate-collection-209",
      text: "I went to the woods and got it, when I got it didn't want it, looked for it, couldn't find it so I took it home.",
      solution: "Splinter",
    },
    {
      id: "ultimate-collection-210",
      text: "What always ends everything?",
      solution: "The letter G",
    },
    {
      id: "ultimate-collection-211",
      text: 'What goes "oh oh oh"?',
      solution: "Santa walking backwards",
    },
    {
      id: "ultimate-collection-212",
      text: "A dad and his four boys stand in line. All crowned, they toil in darkness. Another family they see, two birds of a feather. All of them together clad in leather.",
      solution: "Hand in glove",
    },
    {
      id: "ultimate-collection-213",
      text: "I'm a gift that you'll hate. I'm tough to create. With my emblem, you'll be distinguished As a clan of blood-pride extinguished.",
      solution: "Coat of arms",
    },
    {
      id: "ultimate-collection-214",
      text: "What falls but never breaks and breaks but never falls?",
      solution: "Night and day",
    },
    {
      id: "ultimate-collection-215",
      text: "I start at the finish and finish on the start. How?",
      solution: "Racetrack",
    },
    {
      id: "ultimate-collection-216",
      text: "I'm so simple I only point, Yet I guide people all over the world. What am I?",
      solution: "Compass",
    },
    {
      id: "ultimate-collection-217",
      text: "Armless, legless, I crawl around when I'm young. Then the time of changing sleep will come. I will awake like a newborn, flying beast, 'till then on the remains of the dead I feast.",
      solution: "Maggot",
    },
    {
      id: "ultimate-collection-218",
      text: "I am used for many things like war and destruction, yet also in speech. What am I?",
      solution: "Tongue",
    },
    {
      id: "ultimate-collection-219",
      text: "I sit in parliament. You'll only see me at night... What am I?",
      solution: "Owl",
    },
    {
      id: "ultimate-collection-220",
      text: "A tree with 5 branches, no leaves and no fruits.",
      solution: "Hand",
    },
    {
      id: "ultimate-collection-221",
      text: "My step is slow, the snow's my breath I give the ground, a grinding death My marching makes an end of me Slain by sun or drowned in sea.",
      solution: "Glacier",
    },
    {
      id: "ultimate-collection-222",
      text: "I am one of many, You forget I'm here, but I'm just below. Without me, you'd surely topple, Go ahead, what am I?",
      solution: "Toe",
    },
    {
      id: "ultimate-collection-223",
      text: "I go in dry and come out wet, The longer I'm in, the stronger I get. What am I?",
      solution: "Teabag",
    },
    {
      id: "ultimate-collection-224",
      text: "What's the difference between a well-dressed man on a bicycle and a poorly-dressed man on a tricycle?",
      solution: "Attire",
    },
    {
      id: "ultimate-collection-225",
      text: "I am born in fear, raised in truth, And I come to my own in deed. When comes a time that I'm called forth, I come to serve the cause of need.",
      solution: "Courage",
    },
    {
      id: "ultimate-collection-226",
      text: "With pointed fangs it sits in wait, With piercing force it doles out fate, Over bloodless victims proclaiming its might, Eternally joining in a single bite What is it?",
      solution: "Stapler",
    },
    {
      id: "ultimate-collection-227",
      text: "What is all over a house?",
      solution: "Roof",
    },
    {
      id: "ultimate-collection-228",
      text: "Name any word that becomes shorter even when you add 2 more letters to it?",
      solution: "Short",
    },
    {
      id: "ultimate-collection-229",
      text: "Forever trapped, I have no choice, It is the curse of this life, Just for others like me, Though, if you wander across a kind soul, You may receive a special gift Which will set you free What am I?",
      solution: "Genie",
    },
    {
      id: "ultimate-collection-230",
      text: "I saw a man in white, he looked quite a sight. He was not old, but he stood in the cold. And when he felt the sun, he started to run. Who could he be? Please answer me.",
      solution: "Snowman",
    },
    {
      id: "ultimate-collection-231",
      text: "My first is in wield, sever bones and marrow. My second is in blade, forged in cold steel. My third is in arbalest, and also in arrows. My fourth is in power, plunged through a shield. My fifth is in honor, and also in vows My last will put an end to it all.",
      solution: "Weapon",
    },
    {
      id: "ultimate-collection-232",
      text: "Not born, but from a Mother's body drawn, I hang until half of me is gone. I sleep in a cave until I grow old, then valued for my hardened gold. What am I?",
      solution: "Cheese",
    },
    {
      id: "ultimate-collection-233",
      text: "The captain took a bath without his belly getting wet.",
      solution: "Boat",
    },
    {
      id: "ultimate-collection-234",
      text: "What kind of room doesn't have physical walls?",
      solution: "Mushroom",
    },
    {
      id: "ultimate-collection-235",
      text: "I have no life, but I can die, what am I?",
      solution: "Battery",
    },
    {
      id: "ultimate-collection-236",
      text: "April showers bring May flowers. What do May flowers bring?",
      solution: "Pilgrims",
    },
    {
      id: "ultimate-collection-237",
      text: "Break it and it is better, immediately set and harder to break again.",
      solution: "Record",
    },
    {
      id: "ultimate-collection-238",
      text: "If you have me, you want to tell me. If you tell me, you don't have me.",
      solution: "Secret",
    },
    {
      id: "ultimate-collection-239",
      text: "Born of sorrow, grows with age, You need a lot to be a sage. What is it?",
      solution: "Wisdom",
    },
    {
      id: "ultimate-collection-240",
      text: "There are two meanings to me. With one I may need to be broken, with the other I hold on. My favorite characteristic is my charming dimple. What am I?",
      solution: "Tie",
    },
    {
      id: "ultimate-collection-241",
      text: "You can easily touch me, but not see me. You can throw me out, but not away. What am I?",
      solution: "Your back",
    },
    {
      id: "ultimate-collection-242",
      text: "If you live in an 11-floor house and everything is green, the house, blender, toilet, elevator, ribbon, couch, computer, plates, food! You get to the 6th floor and there are no more stairs how did you get to the 11th floor?",
      solution: "Green elevator",
    },
    {
      id: "ultimate-collection-243",
      text: "To unravel me, you need a key. No key that was made by locksmith's hand, but a key that only I will understand. What am I?",
      solution: "Cipher",
    },
    {
      id: "ultimate-collection-244",
      text: "As beautiful as the setting sun, As delicate as the morning dew; An angel's dusting from the stars, That can turn the Earth into a frosted moon. What am I?",
      solution: "Snow",
    },
    {
      id: "ultimate-collection-245",
      text: "There is a word in the English language in which the first two letters signify a male, the first three letters signify a female, the first four signify a great man, and the whole word, a great woman. What is the word?",
      solution: "Heroine",
    },
    {
      id: "ultimate-collection-246",
      text: "The shorter I am, the bigger I am. What am I?",
      solution: "Temper",
    },
    {
      id: "ultimate-collection-247",
      text: "Air that is expelled orally.",
      solution: "Breath",
    },
    {
      id: "ultimate-collection-248",
      text: "I am made from an animal, Although you nickname me after a different one. You can't eat me; you can only hold me, And once a year a festival is erected in my honor. What am I? I am made from an animal,",
      solution: "Pigskin",
    },
    {
      id: "ultimate-collection-249",
      text: "The sun bakes them, the hand breaks them, the foot treads on them, and the mouth tastes them. What are they?",
      solution: "Grapes",
    },
    {
      id: "ultimate-collection-250",
      text: "What is a Mummy's favorite type of music?",
      solution: "Wrap",
    },
    {
      id: "ultimate-collection-251",
      text: "I can sizzle like bacon, I am made with an egg, I have plenty of backbone, but lack a good leg. I peel layers like onions, but still remain whole. I can be long like a flagpole, yet fit in a hole. What am I?",
      solution: "Snake",
    },
    {
      id: "ultimate-collection-252",
      text: "I'm lighter than air but a million men can't lift me. What am I?",
      solution: "Bubble",
    },
    {
      id: "ultimate-collection-253",
      text: "The sharp slim blade, that cuts the wind. What is it?",
      solution: "Grass",
    },
    {
      id: "ultimate-collection-254",
      text: "What do thief's get for stealing calendars?",
      solution: "12 months",
    },
    {
      id: "ultimate-collection-255",
      text: "Until I am measured, I am not known. Yet how you miss me when I have flown. What am I?",
      solution: "Time",
    },
    {
      id: "ultimate-collection-256",
      text: "What has a coat? Hugs you not in sympathy? Whose smile you'd rather not see? Whose stance is a terrible thing to see? Who is it that brave men run away from? Whose fingers are clawed? Whose sleep lasts for months? And who's company we shunt?",
      solution: "Bear",
    },
    {
      id: "ultimate-collection-257",
      text: "A woman who lives in New York legally married three men. She didn't get divorce, get an annulment or legally separated. How is this possible?",
      solution: "She's a minister",
    },
    {
      id: "ultimate-collection-258",
      text: "I cut through evil Like a double edged sword, And chaos flees at my approach. Balance I single-handedly upraise, Through battles fought with heart and mind, Instead of with my gaze. What am I?",
      solution: "Justice",
    },
    {
      id: "ultimate-collection-259",
      text: "What can travel around the world while staying in a corner?",
      solution: "Stamp",
    },
    {
      id: "ultimate-collection-260",
      text: "I defend without weapons, stand without legs, wound without force, and am harder to fight than to kill. What am I?",
      solution: "Lies",
    },
    {
      id: "ultimate-collection-261",
      text: "I have a leg but I do not move, A face but no expression, Be it wind or rain I stay outside. What am I?",
      solution: "Scarecrow",
    },
    {
      id: "ultimate-collection-262",
      text: "Which side of a cat has the most fur?",
      solution: "Outside",
    },
    {
      id: "ultimate-collection-263",
      text: "What kind of room has no doors or windows?",
      solution: "Mushroom",
    },
    {
      id: "ultimate-collection-264",
      text: "I have a hundred legs but cannot stand, a long neck but no head; I eat the maid's life. What am I?",
      solution: "Broom",
    },
    {
      id: "ultimate-collection-265",
      text: "The word CANDY can be spelled using just 2 letters. Can you figure out how?",
      solution: "C and Y",
    },
    {
      id: "ultimate-collection-266",
      text: "You may always chase me but you are always about 3 miles away. What am I?",
      solution: "Horizon",
    },
    {
      id: "ultimate-collection-267",
      text: "I look flat, but I am deep, Hidden realms I shelter. Lives I take, but food I offer. At times I am beautiful. I can be calm, angry and turbulent. I have no heart, but offer pleasure as well as death. No man can own me, yet I encompass what all men must have.",
      solution: "Ocean",
    },
    {
      id: "ultimate-collection-268",
      text: "Many shapes, many sizes. Can't be seen, only felt. I bring pain, I bring joy, I bring laughter, I bring happiness. I can tear the mightiest from their thrones, and those who have me are rich. What am I?",
      solution: "Emotion",
    },
    {
      id: "ultimate-collection-269",
      text: "They can be harbored, but few hold water, You can nurse them, but only by holding them against someone else, You can carry them, but not with your arms, You can bury them, but not in the earth.",
      solution: "Grudges",
    },
    {
      id: "ultimate-collection-270",
      text: "Anna brings her; she brings Anna, with her wherever she goes.",
      solution: "Banana",
    },
    {
      id: "ultimate-collection-271",
      text: "I bind it and it walks. I loose it and it stops.",
      solution: "Sandal",
    },
    {
      id: "ultimate-collection-272",
      text: "It has a long neck, A name of a bird, Feeds on cargo of ships, It's not alive,",
      solution: "Crane",
    },
    {
      id: "ultimate-collection-273",
      text: "Downward grows the root. Outward grows the skin. Upward grows the shoot. What way blows the wind?",
      solution: "Nowhere",
    },
    {
      id: "ultimate-collection-274",
      text: "What loses its head every morning only to get it back every night?",
      solution: "Pillow",
    },
    {
      id: "ultimate-collection-275",
      text: "I have 10 fingers and 10 toes, I have 2 eyes a mouth and nose, I'll always be beside you through thick and thin, Not through body, but through my spirit within. What am I?",
      solution: "Doll",
    },
    {
      id: "ultimate-collection-276",
      text: "I have a tongue, but cannot speak. I have a bed but cannot sleep. I have four legs but cannot walk. Yet I move as you do. What am I?",
      solution: "Wagon",
    },
    {
      id: "ultimate-collection-277",
      text: "I fall with the waves, rise with the tide, and drift with the current alongside. What am I?",
      solution: "Seaweed",
    },
    {
      id: "ultimate-collection-278",
      text: "The strangest creature you'll ever find: Two eyes in front and many many more behind.",
      solution: "Peacock",
    },
    {
      id: "ultimate-collection-279",
      text: "Two children are born on the same day from the same mother but they are not twins. How is that possible?",
      solution: "Triplets",
    },
    {
      id: "ultimate-collection-280",
      text: "Tall when seated, short when standing.",
      solution: "Dog",
    },
    {
      id: "ultimate-collection-281",
      text: "When my first is a task to a young girl of spirit, And my second confines her to finish the piece, How hard is her fate! But how great is her merit If by taking my whole she effects her release!",
      solution: "Hemlock",
    },
    {
      id: "ultimate-collection-282",
      text: "I bubble and laugh And spit water in your face. I am no lady, And I don't wear lace.",
      solution: "Fountain",
    },
    {
      id: "ultimate-collection-283",
      text: "When I point up it's bright, but when I point down it's dark. What am I?",
      solution: "Light switch",
    },
    {
      id: "ultimate-collection-284",
      text: "A hundred brothers lie next to each other; Each white and fine - they've only one spine. I am the tongue that lies between two. Remove me to gather their wisdom to you.",
      solution: "Book",
    },
    {
      id: "ultimate-collection-285",
      text: "What has to be broken before you can use it?",
      solution: "Egg",
    },
    {
      id: "ultimate-collection-286",
      text: "I can be dropped from the tallest of buildings and survive, but drop me from the smallest ship and I won't. What am I?",
      solution: "Paper",
    },
    {
      id: "ultimate-collection-287",
      text: "Handy when you need to measure something or run a kingdom.",
      solution: "Ruler",
    },
    {
      id: "ultimate-collection-288",
      text: "I have four wings, but cannot fly, I never laugh and never cry; on the same spot I'm always found, toiling away with little sound. What am I?",
      solution: "Windmill",
    },
    {
      id: "ultimate-collection-289",
      text: "With my pair I should be, But I am usually alone you see, For a monster always eats me. Do you know what I must be?",
      solution: "Sock",
    },
    {
      id: "ultimate-collection-290",
      text: "What flies around all day but never goes anywhere?",
      solution: "Flag",
    },
    {
      id: "ultimate-collection-291",
      text: "Patch upon patch, without any stitches, if you tell me this riddle, I'll give you my breeches.",
      solution: "Cabbage",
    },
    {
      id: "ultimate-collection-292",
      text: "In spring I look gay, Covered in a green array, The warmer it gets the more clothing I wear, As the cold grows, I throw away my clothes.",
      solution: "Tree",
    },
    {
      id: "ultimate-collection-293",
      text: "If your life is cut short, I am not the one to blame. You signed up, and your death was not my aim. Enter our doors; there is so much to see, We just happen to hold the key, To adventure abound And fun to be found Step in our door And see what is in store. What am I?",
      solution: "Arcade",
    },
    {
      id: "ultimate-collection-294",
      text: "If you drop a yellow hat in the Red Sea what will it become?",
      solution: "Wet",
    },
    {
      id: "ultimate-collection-295",
      text: "I can run but never walk. Wherever I go, thoughts are close behind me. What am I?",
      solution: "Nose",
    },
    {
      id: "ultimate-collection-296",
      text: "What seven-letter word becomes longer when the third letter is removed?",
      solution: "Lounger",
    },
    {
      id: "ultimate-collection-297",
      text: "Steals an event or even a mood. Reveals the truth or shatters it.",
      solution: "Camera",
    },
    {
      id: "ultimate-collection-298",
      text: "I build bridges of silver and crowns of gold. Who am I?",
      solution: "Dentist",
    },
    {
      id: "ultimate-collection-299",
      text: "I'm light as a feather, yet the strongest man can't hold me for more than 5 minutes. What am I?",
      solution: "Breath",
    },
    {
      id: "ultimate-collection-300",
      text: "My thunder comes before my lightning. My lightning comes before my rain. And my rain dries all the ground it touches. What am I?",
      solution: "Volcano",
    },
    {
      id: "ultimate-collection-301",
      text: "I love to wake up at noon And help with the many JOBS I prefer the countryside to the city I help produce the things you eat What Am I?",
      solution: "Farmer",
    },
    {
      id: "ultimate-collection-302",
      text: "I am used to bat with, yet I never get a hit. I am near a ball, yet it is never thrown. What am I?",
      solution: "Eyelash",
    },
    {
      id: "ultimate-collection-303",
      text: "I have a title and many pages I am a gentiel of gentiel descent I am a killer veteran of war I am a slave to my lord Pledged to his service.",
      solution: "Knight",
    },
    {
      id: "ultimate-collection-304",
      text: "You can see nothing else when you look in my face, I will look you in the eye and I will never lie. What am I?",
      solution: "Mirror",
    },
    {
      id: "ultimate-collection-305",
      text: "What gets wetter and wetter the more it dries?",
      solution: "Towel",
    },
    {
      id: "ultimate-collection-306",
      text: "What has 4 fingers and a thumb, but is not living?",
      solution: "Glove",
    },
    {
      id: "ultimate-collection-307",
      text: "What has black spots and a white face, is fat not thin, and helps you to win, but tumbles all over the place?",
      solution: "Dice",
    },
    {
      id: "ultimate-collection-308",
      text: "What five-letter word, no matter how you pronounce it, is always pronounced wrong?",
      solution: "Wrong",
    },
    {
      id: "ultimate-collection-309",
      text: "Not a burden for its weight and daily carried out, He who takes it wishes it had never come about.",
      solution: "Coffin",
    },
    {
      id: "ultimate-collection-310",
      text: "What is red and nailed to a wall?",
      solution: "Painting",
    },
    {
      id: "ultimate-collection-311",
      text: "It has no life but it sleeps.",
      solution: "Laptop",
    },
    {
      id: "ultimate-collection-312",
      text: "What can be right but never wrong?",
      solution: "Angle",
    },
    {
      id: "ultimate-collection-313",
      text: "Two legs I have, and this will confound, only at rest do they touch the ground. What am I?",
      solution: "Wheelbarrow",
    },
    {
      id: "ultimate-collection-314",
      text: "What is given but kept by the giver?",
      solution: "Birth",
    },
    {
      id: "ultimate-collection-315",
      text: "I have eight to spare and am covered with hair.",
      solution: "Dog",
    },
    {
      id: "ultimate-collection-316",
      text: "What is so delicate that saying its name breaks it?",
      solution: "Silence",
    },
    {
      id: "ultimate-collection-317",
      text: "I throw the eggs; they crow immediately.",
      solution: "Rooster",
    },
    {
      id: "ultimate-collection-318",
      text: "It is hate and has hate in it, but it isn't hate.",
      solution: "Alphabet",
    },
    {
      id: "ultimate-collection-319",
      text: "No head has he but he wears a hat. No feet has he but he stands up straight. On him perhaps a fairy sat, weaving a spell one evening late!",
      solution: "Mushroom",
    },
    {
      id: "ultimate-collection-320",
      text: "What has 3 feet but cannot walk?",
      solution: "Yardstick",
    },
    {
      id: "ultimate-collection-321",
      text: "I am two-faced, but bear one head. Men spill their blood for me. I have no legs but travel widely. I make kings immortal. I am potent when shared; Yet lust for my power keeps me locked away. What am I?",
      solution: "Coin",
    },
    {
      id: "ultimate-collection-322",
      text: "I wear a red coat and have a stone in my throat.",
      solution: "Cherry",
    },
    {
      id: "ultimate-collection-323",
      text: "A skin have I, more eyes than one. I can be very nice when I am done. What am I?",
      solution: "Potato",
    },
    {
      id: "ultimate-collection-324",
      text: "You can spin, wheel and twist, but it can turn without moving. What is it?",
      solution: "Milk",
    },
    {
      id: "ultimate-collection-325",
      text: "Long and slinky like a trout, never sings till its guts come out. What is it?",
      solution: "Gun",
    },
    {
      id: "ultimate-collection-326",
      text: "Rearrange the letters OWONDER to make one word.",
      solution: "One word",
    },
    {
      id: "ultimate-collection-327",
      text: "There's no reason to fear If you see me lurking here Even though I shouldn't exist But few might have missed That I'm not at all real Because nothing can conceal The fact that I'm something That's not at all living What am I?",
      solution: "Ghost",
    },
    {
      id: "ultimate-collection-328",
      text: "I am slim and tall, Many find me desirable and appealing, They touch me and I give a false good feeling, Once I shine in splendor, But only once and then no more, For many I am to die for. What am I?",
      solution: "Cigarette",
    },
    {
      id: "ultimate-collection-329",
      text: "A truck driver is going opposite traffic on a one-way street. A police officer sees him but doesn't stop him. Why didn't the police officer stop him?",
      solution: "He was walking",
    },
    {
      id: "ultimate-collection-330",
      text: "He stands beside the road in a purple cap and tattered green cloak. Those who touch him, curse him.",
      solution: "Thistle",
    },
    {
      id: "ultimate-collection-331",
      text: "I fly, yet I have no wings. I cry, yet I have no eyes. Darkness follows me; lower light I never see. What am I?",
      solution: "Cloud",
    },
    {
      id: "ultimate-collection-332",
      text: "You will know that I am coming from the jingle of my bell, but exactly who I am is not an easy thing to tell. Children, they adore me for they find me jolly, but I do not see them when the halls are decked with holly. My JOB often leaves me frozen, I am a man that all should know, but I do not do business in times of sleet or ice or snow. I travel much on business, but no reindeer haul me around, I do all my traveling firmly on the ground. I love the time of Christmas, but that's not my vocational season, and I assure that is because of a sound economic reason. Who am I?",
      solution: "Ice cream man",
    },
    {
      id: "ultimate-collection-333",
      text: "Arnold Schwarzenegger has a big one, Michael j fox has a small one, Madonna doesn't have one, The pope has one but he never uses it, Bill Clinton Has one and he uses it all the time! What is it?",
      solution: "Last name",
    },
    {
      id: "ultimate-collection-334",
      text: "When you do not know what I am, then I am something. But when you know what I am, then I am nothing. What am I?",
      solution: "Riddle",
    },
    {
      id: "ultimate-collection-335",
      text: "Alight or in dark, my face is a leer. In a field with my brothers, you'll find me without bother, For that autumn day is mine.",
      solution: "Pumpkin",
    },
    {
      id: "ultimate-collection-336",
      text: "I do not listen to reason, but I hear every siren's song and will try to steer us towards the rocks if you let me take the wheel. Who am I?",
      solution: "Emotion",
    },
    {
      id: "ultimate-collection-337",
      text: "Born at the same time as the world, destined to live as long as the world, and yet never five weeks old. What is it?",
      solution: "Moon",
    },
    {
      id: "ultimate-collection-338",
      text: "Even if you throw it away, it still comes back",
      solution: "Boomerang",
    },
    {
      id: "ultimate-collection-339",
      text: "What do you have when you're sitting down that you don't have when you're standing up?",
      solution: "Lap",
    },
    {
      id: "ultimate-collection-340",
      text: "Goes over all the hills and hollows, Bites hard, but never swallows.",
      solution: "Frost",
    },
    {
      id: "ultimate-collection-341",
      text: "What disappears coming from there to here and reappears going from here to there?",
      solution: "The letter T",
    },
    {
      id: "ultimate-collection-342",
      text: "The 8 of us move back, and forth to protect our king from the foes attack. What are we?",
      solution: "Pawns",
    },
    {
      id: "ultimate-collection-343",
      text: "I'm not mans best friend, I'm their enemy, I can mark your end, yet you do not see me, I am very small, But very tough, If you have me, then you have it rough.",
      solution: "Disease",
    },
    {
      id: "ultimate-collection-344",
      text: "Weight in my stomach, trees on my back, nails in my ribs, its feet I lack. What am I?",
      solution: "Ship",
    },
    {
      id: "ultimate-collection-345",
      text: "A bus driver was heading down a street in Colorado. He went right past a stop sign without stopping, he turned left where there was a no left turn sign, and he went the wrong way on a one-way street. Then he went on the left side of the road past a cop car. Still - he didn't break any traffic laws. Why not?",
      solution: "He was walking",
    },
    {
      id: "ultimate-collection-346",
      text: "I come when the weather is at its prime, Though, it might be wise to leave nothing on the street. But, in the wintertime My name is obsolete What am I?",
      solution: "Street sweeper",
    },
    {
      id: "ultimate-collection-347",
      text: "I'm tall when I'm young and I'm short when I'm old. What am I?",
      solution: "Candle",
    },
    {
      id: "ultimate-collection-348",
      text: "The stack just might be sent all over. Full of what's new, yet it's nearly obsolete.",
      solution: "Newspaper",
    },
    {
      id: "ultimate-collection-349",
      text: "What's always coming, but never arrives?",
      solution: "Tomorrow",
    },
    {
      id: "ultimate-collection-350",
      text: "A man was playing a game 4 miles away from his house. After 5 minutes, he ran home in 13 seconds. He doesn't have super powers, and the game doesn't require moving closer to his house. How is this possible?",
      solution: "Baseball",
    },
    {
      id: "ultimate-collection-351",
      text: "What word looks the same upside down and backwards?",
      solution: "SWIMS",
    },
    {
      id: "ultimate-collection-352",
      text: "We chop its feet; we drink its blood.",
      solution: "Tree",
    },
    {
      id: "ultimate-collection-353",
      text: "What goes up and down without moving?",
      solution: "Stairs",
    },
    {
      id: "ultimate-collection-354",
      text: "What can you catch but not throw?",
      solution: "Cold",
    },
    {
      id: "ultimate-collection-355",
      text: "I live in a busy place in the city, I'll let you stay with me for a while, If you don't feed me, I can get you into trouble. What am I?",
      solution: "Parking meter",
    },
    {
      id: "ultimate-collection-356",
      text: "A very pretty thing I am, fluttering in the pale-blue sky. Delicate, fragile on the wing, indeed I am a pretty thing. What am I?",
      solution: "Butterfly",
    },
    {
      id: "ultimate-collection-357",
      text: "I saw the dead bring forth the living. I saw the living bring forth the dead. Who or what did I see?",
      solution: "Fire and wood",
    },
    {
      id: "ultimate-collection-358",
      text: "Just head and foot yet never tires of dancing,",
      solution: "Spinning top",
    },
    {
      id: "ultimate-collection-359",
      text: "Deep, deep, do they go. Spreading out as they go. Never needing any air. They are sometimes as fine as hair.",
      solution: "Roots",
    },
    {
      id: "ultimate-collection-360",
      text: "What demands an answer, but asks no question?",
      solution: "Phone",
    },
    {
      id: "ultimate-collection-361",
      text: "No thicker than your finger when it folds. As thick as what it's holding when it holds.",
      solution: "Bag",
    },
    {
      id: "ultimate-collection-362",
      text: "What do you find in the kitchen that is not alive?",
      solution: "Deadpans",
    },
    {
      id: "ultimate-collection-363",
      text: "With thieves I consort, With the vilest, in short, I'm quite at ease in depravity; Yet all divines use me, And savants can't lose me, For I am the center of gravity.",
      solution: "The letter V",
    },
    {
      id: "ultimate-collection-364",
      text: "Full of dark, filled with everything Both on my skin they color With my pack, I am always Afraid of the cat. What am I?",
      solution: "Zebra",
    },
    {
      id: "ultimate-collection-365",
      text: "I have four legs, a back, but no head. What am I?",
      solution: "A chair",
    },
    {
      id: "ultimate-collection-366",
      text: "I am something all men have but all men deny. Man created me but no man can hold me. What am i?",
      solution: "Fear",
    },
    {
      id: "ultimate-collection-367",
      text: "Half of the population uses me, and you lose me all the time. I'm small and yellow, black, brown or silver. You use me to hold things up. What am I?",
      solution: "Bobbypins",
    },
    {
      id: "ultimate-collection-368",
      text: "I have many feathers to help me fly. I have a body and head, but I'm not alive. It is your strength that determines how far I go. You can hold me in your, but I'm never thrown. What am I?",
      solution: "An arrow",
    },
    {
      id: "ultimate-collection-369",
      text: "I go around in circles, But always straight ahead Never complain, No matter where I am led.",
      solution: "Wheel",
    },
    {
      id: "ultimate-collection-370",
      text: "What can an elephant and a shrimp both be?",
      solution: "Jumbo",
    },
    {
      id: "ultimate-collection-371",
      text: "I am flora, not fauna, I am foliage, not trees, I am shrubbery, not grass, What am I?",
      solution: "A bush",
    },
    {
      id: "ultimate-collection-372",
      text: "Which tree is the most difficult to get along with?",
      solution: "A crab tree",
    },
    {
      id: "ultimate-collection-373",
      text: "It produces a flower but it is not its fruit; it produces branches which are its fruit.",
      solution: "Sweet Corn",
    },
    {
      id: "ultimate-collection-374",
      text: "In the prairie it was stabbed, in the house it was pulled.",
      solution: "Crabgrass",
    },
    {
      id: "ultimate-collection-375",
      text: "I cannot hear or even see, But sense light and sounds there may be, Sometimes I end up on a hook, I can be combined with a book. What am I?",
      solution: "A worm",
    },
    {
      id: "ultimate-collection-376",
      text: "I have a tongue but cannot taste. I have a soul but cannot feel. What am I?",
      solution: "A shoe",
    },
    {
      id: "ultimate-collection-377",
      text: "What is everyone in the world doing at the same time?",
      solution: "Growing old",
    },
    {
      id: "ultimate-collection-378",
      text: "What is something you will never see again?",
      solution: "Yesterday",
    },
    {
      id: "ultimate-collection-379",
      text: "Why can't the Tyrannosaurus rex clap?",
      solution: "They are extinct",
    },
    {
      id: "ultimate-collection-380",
      text: "A red house is made out of red bricks. A blue house is made out of blue bricks. What is a green house made out of?",
      solution: "Gases",
    },
    {
      id: "ultimate-collection-381",
      text: "I'm a king that speaks for my country At birth I protected by no one As I grow my fathers gives me 2 soldiers to protect me As I get matured many more are given to me And at my full age my father gives me 32 white soldiers to guard me and protect me What Am I?",
      solution: "Tongue",
    },
    {
      id: "ultimate-collection-382",
      text: "From house to house I go, sometimes narrow, sometimes wide. And whether there's rain or snow I always stay outside. What am I?",
      solution: "Path",
    },
    {
      id: "ultimate-collection-383",
      text: "For our ambrosia we were blessed, By Jupiter, with a sting of death. Though our might, to some is jest, We have quelled the dragon's breath. Who are we?",
      solution: "Bees",
    },
    {
      id: "ultimate-collection-384",
      text: "I end and begin the day, Without me, you'll pay. With the aid of sheep, All my benefits you shall reap. If I make you miss class, You shall not pass! What am I?",
      solution: "Sleep",
    },
    {
      id: "ultimate-collection-385",
      text: "What heavy seven letter word can you take two away from and be left with eight?",
      solution: "Weights",
    },
    {
      id: "ultimate-collection-386",
      text: "I stare at you, you stare at me. I have three eyes, yet can't see. Every time I blink, I give you commands. You do as you are told, with your feet and hands. What am I?",
      solution: "Traffic light",
    },
    {
      id: "ultimate-collection-387",
      text: "Three little letters, a paradox to some. The worse that it is, the better it becomes.",
      solution: "Pun",
    },
    {
      id: "ultimate-collection-388",
      text: "Nothing specific, but more than a few. This many clustered, together will do.",
      solution: "Several",
    },
    {
      id: "ultimate-collection-389",
      text: "I am the first you ever saw, what greets you every morning and what goes out in the end.",
      solution: "Light",
    },
    {
      id: "ultimate-collection-390",
      text: "Made of ten but two we make, When assembled others quake, Five apart and we are weak, Five together havoc wreak. What are we?",
      solution: "Fists",
    },
    {
      id: "ultimate-collection-391",
      text: "What can be measured but has no length, width or height?",
      solution: "Temperature",
    },
    {
      id: "ultimate-collection-392",
      text: "I am window, I am lamp, I am clouded, I am shining and I am colored, set in white, I fill with water and overflow. I say much but I have no words. What am I?",
      solution: "Eye",
    },
    {
      id: "ultimate-collection-393",
      text: "I am seen in the water If seen in the sky, I am in the rainbow, A jay's feather, And lapis lazuli.",
      solution: "Blue",
    },
    {
      id: "ultimate-collection-394",
      text: "Part carbon, part water, I am poison to the fishes. Many have falsely claimed my name, for I am the pause that refreshes.",
      solution: "Coke",
    },
    {
      id: "ultimate-collection-395",
      text: "Lighter than what I'm made of, more of me is hidden than is seen. What am I?",
      solution: "Iceberg",
    },
    {
      id: "ultimate-collection-396",
      text: "Bulbs on branches, High in the trees, Can I please have one of these? A pony a puppy, and a kitty to! Oh my thank you! They're shiny and new! We gather together, to give and receive, On this it's special to me.",
      solution: "Christmas",
    },
    {
      id: "ultimate-collection-397",
      text: "It's in your hand though you cannot feel it. Only you and time can reveal it.",
      solution: "Fate",
    },
    {
      id: "ultimate-collection-398",
      text: "There is a creature of God whose body is hard; it does not wish to eat unless you strike its head.",
      solution: "Nail",
    },
    {
      id: "ultimate-collection-399",
      text: "Screaming, soaring Seeking sky. Flowers of fire Flying high, Eastern art From ancient time Name me now And solve this rhyme.",
      solution: "Fireworks",
    },
    {
      id: "ultimate-collection-400",
      text: "I'm a word, six letters long; I sometimes enter with a gong. All in order from A to Z, I start with the letter B. What is the word?",
      solution: "Begins",
    },
    {
      id: "ultimate-collection-401",
      text: "What goes up and never comes down?",
      solution: "Age",
    },
    {
      id: "ultimate-collection-402",
      text: "What time is spelled the same forwards and backwards?",
      solution: "Noon",
    },
    {
      id: "ultimate-collection-403",
      text: "This on this. That on that. Growing tall, But never fat. What am I?",
      solution: "Snowman",
    },
    {
      id: "ultimate-collection-404",
      text: "What kinds of men are always above board?",
      solution: "Chessmen",
    },
    {
      id: "ultimate-collection-405",
      text: "What do you get if you put a radio in the fridge?",
      solution: "Cool music",
    },
    {
      id: "ultimate-collection-406",
      text: "Useful tool for who in darkness dwell. Within you, corrupting like a deadly spell.",
      solution: "Ignorance",
    },
    {
      id: "ultimate-collection-407",
      text: "It may only be given, Not taken or bought, What the sinner desires, But the saint does not.",
      solution: "Forgiveness",
    },
    {
      id: "ultimate-collection-408",
      text: "What gets broken without being hold?",
      solution: "Promise",
    },
    {
      id: "ultimate-collection-409",
      text: "What has a head yet it never weeps, has a bed but never sleeps, can run but can not walks, and has a bank but not a cent to its name?",
      solution: "River",
    },
    {
      id: "ultimate-collection-410",
      text: "Shoot at me a thousand times and I may still survive; one scratch from you and me will find your prospects take a dive. What am I?",
      solution: "Eight ball",
    },
    {
      id: "ultimate-collection-411",
      text: "Is there a number which, when written as a word has same number of letters as its numerical value?",
      solution: "Four",
    },
    {
      id: "ultimate-collection-412",
      text: "A father's child. A mother's child. No one's son. Who am I?",
      solution: "Daughter",
    },
    {
      id: "ultimate-collection-413",
      text: "Shifting, Shifting, Drifting deep. Below me great and mighty cities sleep. Swirling, Scurlling, All around. I'm only where no water will be found.",
      solution: "Desert",
    },
    {
      id: "ultimate-collection-414",
      text: "What stinks when living and smells good when dead?",
      solution: "Bacon",
    },
    {
      id: "ultimate-collection-415",
      text: "What is that which goes with a carriage, comes with a carriage, is of no use to a carriage, and yet the carriage cannot go without it?",
      solution: "Noise",
    },
    {
      id: "ultimate-collection-416",
      text: "What is red and smells like blue paint?",
      solution: "Red paint",
    },
    {
      id: "ultimate-collection-417",
      text: "I am greater than God, more evil than the devil, the poor have me, the rich don't, and if you eat me, you'll die. What am I?",
      solution: "Nothing",
    },
    {
      id: "ultimate-collection-418",
      text: "What can burn the eyes, sting the mouth, yet be consumed and thought delicious?",
      solution: "Pepper",
    },
    {
      id: "ultimate-collection-419",
      text: "The more you take from me, the bigger I get. What am I?",
      solution: "Hole",
    },
    {
      id: "ultimate-collection-420",
      text: "Always well dressed, but I never fly. Black and white, sometimes in a tie. I swim and slide, and dance and glide, With one person by my side. What am I?",
      solution: "Penguin",
    },
    {
      id: "ultimate-collection-421",
      text: "It's got twists and turns, but has no curves. Twist it to fix it, turn it to ruin it. What is it?",
      solution: "Rubiks cube",
    },
    {
      id: "ultimate-collection-422",
      text: "The part of the bird, that is not in the sky, Which can swim in the ocean and always stay dry. What is it?",
      solution: "Shadow",
    },
    {
      id: "ultimate-collection-423",
      text: "I am a strange creature, Hovering in the air, Moving from here to there, with a brilliant flare. Some say I sing, but others say I have no voice. So I just hum - as a matter of choice. What am I?",
      solution: "Hummingbird",
    },
    {
      id: "ultimate-collection-424",
      text: "If a man carried my burden, he would break his back. I am not rich, but I leave silver in my track. What am I?",
      solution: "Snail",
    },
    {
      id: "ultimate-collection-425",
      text: "What building has the most stories?",
      solution: "Library",
    },
    {
      id: "ultimate-collection-426",
      text: "What starts with the letter t, is filled with t and ends in t?",
      solution: "Teapot",
    },
    {
      id: "ultimate-collection-427",
      text: "A little pool with two layers of wall around it. One white and soft and the other dark and hard, amidst a light brown grassy lawn with an outline of a green grass. What am I?",
      solution: "Coconut",
    },
    {
      id: "ultimate-collection-428",
      text: "Both king and horse have this, of course, But you'll want neither of them, perforce.",
      solution: "Charley horse",
    },
    {
      id: "ultimate-collection-429",
      text: "What 11 letter English word is always pronounced incorrectly?",
      solution: "Incorrectly",
    },
    {
      id: "ultimate-collection-430",
      text: "A cloud was my mother, the wind is my father, my son is the cool stream, and my daughter is the fruit of the land. A rainbow is my bed, the earth my final resting place, and I'm the torment of man.",
      solution: "Rain",
    },
    {
      id: "ultimate-collection-431",
      text: "One simple click, one simple flash. Preserving a memory, for years I will last. What am I?",
      solution: "Camera",
    },
    {
      id: "ultimate-collection-432",
      text: "It is sharp but not pepper; white but not paper; green but not shaddock; guess what that is.",
      solution: "Leek",
    },
    {
      id: "ultimate-collection-433",
      text: "I can be told and can make you crazy, Most people don't like me and think I'm harmful. What am I?",
      solution: "Lie",
    },
    {
      id: "ultimate-collection-434",
      text: "I can always go up, never down, I can always turn left, never right, I am always hot when I'm cold",
      solution: "Thermometer",
    },
    {
      id: "ultimate-collection-435",
      text: "What has roots you cannot see, up up it goes, yet never grows.",
      solution: "Mountain",
    },
    {
      id: "ultimate-collection-436",
      text: "My coat keeps me safe From damage that's near. I cause you happiness, sadness, Anticipation and fear. On the outside, I am put under judgment of price. But my insides have far more value That not even MONEY can suffice.",
      solution: "Book",
    },
    {
      id: "ultimate-collection-437",
      text: "What can you fold but not crease?",
      solution: "Poker",
    },
    {
      id: "ultimate-collection-438",
      text: "A man is wearing all black. A black car is approaching towards the man. How did the driver managed to stop in time?",
      solution: "Daytime",
    },
    {
      id: "ultimate-collection-439",
      text: "I'm a very valuable thing to have. Use me right now, you should. Yet if you cut off my hindquarters, I'd be but a piece of wood. What am I?",
      solution: "Good",
    },
    {
      id: "ultimate-collection-440",
      text: "Above all things have I been placed Thus have I, a man disgraced. I describe sunlight or lock But after all, I'm just a rock.",
      solution: "Cornerstone",
    },
    {
      id: "ultimate-collection-441",
      text: "On my way to St. Ives, I met a man with seven wives. Each wife had seven sacks, Each sack had seven cats, Each cat had seven kits. Kits, cats, sacks, wives, How many were going to St. Ives?",
      solution: "One",
    },
    {
      id: "ultimate-collection-442",
      text: "What has everything inside it? Everything you can imagine even god, wind, world, sky, heaven, earth and everything that comes to your mind?",
      solution: "Dictionary",
    },
    {
      id: "ultimate-collection-443",
      text: "What goes up, but at the same time goes down? Up toward the sky, and down toward the ground. Its present tense and past tense too, come for a ride, just you and me!!!",
      solution: "Seesaw",
    },
    {
      id: "ultimate-collection-444",
      text: "What is it that makes tears without sorrow and takes its journey to heaven?",
      solution: "Smoke",
    },
    {
      id: "ultimate-collection-445",
      text: "I saw a strange creature, Long, hard, and straight, Thrusting in a round, dark, opening, Preparing to discharge its load of lives, Puffing and squealing noises accompanied it, Then a final screech as it slowed and stopped.",
      solution: "Train",
    },
    {
      id: "ultimate-collection-446",
      text: "I go around all the places; cities, towns and villages, but never come inside. What am I?",
      solution: "Street",
    },
    {
      id: "ultimate-collection-447",
      text: "An open ended barrel, it is shaped like a hive. It is filled with the flesh, and the flesh is alive!",
      solution: "Thimble",
    },
    {
      id: "ultimate-collection-448",
      text: "I warn you about meetings, and I assist you in my life, I can help you do most of my work, unless I have a bug. What am I?",
      solution: "Calendar",
    },
    {
      id: "ultimate-collection-449",
      text: "Poke your fingers in my eyes and I will open wide my jaws. Linen cloth, quills, or paper, my greedy lust devours them all. What am I?",
      solution: "Scissors",
    },
    {
      id: "ultimate-collection-450",
      text: "Pedro hides but his head is still exposed",
      solution: "Turtle",
    },
    {
      id: "ultimate-collection-451",
      text: "I have one, you have one. If you remove the first letter, a bit remains. If you remove the second, bit still remains. After much trying, you might be able to remove the third one also, but it remains. What am I?",
      solution: "Habit",
    },
    {
      id: "ultimate-collection-452",
      text: "Faster than a twitch! Fly with me to the Pitch! With a seeker, a keeper, Or a chaser, a beater, Wizard or witch; I play a mean game of Quidditch. What am I?",
      solution: "Snitch",
    },
    {
      id: "ultimate-collection-453",
      text: "Round like a dishpan and smaller than a bathtub. But the ocean can't fill it. What is it?",
      solution: "Sieve",
    },
    {
      id: "ultimate-collection-454",
      text: "I'm named after nothing, though I'm awfully clamorous. And when I'm not working, your house is less glamorous. What am I?",
      solution: "Vacuum",
    },
    {
      id: "ultimate-collection-455",
      text: "When they are caught, they are thrown away. When they escape, you itch all day.",
      solution: "Fleas",
    },
    {
      id: "ultimate-collection-456",
      text: "What gets bigger as you take out of it?",
      solution: "Hole",
    },
    {
      id: "ultimate-collection-457",
      text: "I am a notebook, but have no pages. I have a screen, but not to keep bugs, just pests.",
      solution: "Laptop",
    },
    {
      id: "ultimate-collection-458",
      text: "What must be in the oven yet cannot be baked? Grows in the heat yet shuns the light of day? What sinks in water but rises with air? Looks like skin, but is fine as hair?",
      solution: "Dough",
    },
    {
      id: "ultimate-collection-459",
      text: "I am everywhere. Nothing can compare. Run and hide and I will still be there Because everything is mine to share. No need to seek me out, Though, you may just run out. What am I?",
      solution: "Time",
    },
    {
      id: "ultimate-collection-460",
      text: "A fruit on a tree. A tree on a fruit.",
      solution: "Pineapple",
    },
    {
      id: "ultimate-collection-461",
      text: "Hands she has but does not hold, teeth she has but does not bite, feet she has but they are cold, eyes she has but without sight. Who is she?",
      solution: "Doll",
    },
    {
      id: "ultimate-collection-462",
      text: "We are emeralds and diamonds, Lost by the moon; Found by the sun, And picked up soon.",
      solution: "Dew",
    },
    {
      id: "ultimate-collection-463",
      text: "I cannot be felt, seen or touched; Yet I can be found in everybody; My existence is always in debate; Yet there is a style of music named after me.",
      solution: "Soul",
    },
    {
      id: "ultimate-collection-464",
      text: "What is bought by the yard by is worn by the foot?",
      solution: "Carpet",
    },
    {
      id: "ultimate-collection-465",
      text: "He's small but he can climb a tower.",
      solution: "Ant",
    },
    {
      id: "ultimate-collection-466",
      text: "What can't you see, hear or feel, until it's too late. What shadows love, and shop keepers hate?",
      solution: "Thief",
    },
    {
      id: "ultimate-collection-467",
      text: "Ten Men's Strength, Ten Men's Length, Ten Men can't break it, yet a young boy walks off with it What am I?",
      solution: "Rope",
    },
    {
      id: "ultimate-collection-468",
      text: "I am the center of Gravity.",
      solution: "Letter V",
    },
    {
      id: "ultimate-collection-469",
      text: "What two things can you never eat for breakfast?",
      solution: "Lunch and dinner",
    },
    {
      id: "ultimate-collection-470",
      text: "Forwards I am heavy, but backwards I am not. What am I?",
      solution: "Ton",
    },
    {
      id: "ultimate-collection-471",
      text: "I am nothing but holes tied to holes, yet am strong as iron.",
      solution: "Chain",
    },
    {
      id: "ultimate-collection-472",
      text: "I work hard most every day, Not much time to dance and play, If I could reach what I desire, all like me would now retire. What am I?",
      solution: "Miner",
    },
    {
      id: "ultimate-collection-473",
      text: "Blow for blow, They matched each other. Neither would fall to the other. In the eyes of the crowd, They were this.",
      solution: "Even",
    },
    {
      id: "ultimate-collection-474",
      text: "Twice I appear to take them away. There is nowhere I can't reach. I come at your beck and call No matter where you are. But, while you see me appear You never see me before I draw near. What am I?",
      solution: "Hearse",
    },
    {
      id: "ultimate-collection-475",
      text: "When set loose, I fly away, Never so cursed, as when I go astray",
      solution: "Arrow",
    },
    {
      id: "ultimate-collection-476",
      text: "What kind of street does a ghost like best?",
      solution: "Dead end",
    },
    {
      id: "ultimate-collection-477",
      text: "I saw a creature: his stomach stuck out behind him, Enormously swollen. A stalwart servant Waited upon him. What filled up his stomach Had travelled from far, and flew through his eye He does not always die in giving life To others, but new strength revives In the pit of his stomach; he breathes again.",
      solution: "Bellows",
    },
    {
      id: "ultimate-collection-478",
      text: "A deep well full of knives",
      solution: "Mouth",
    },
    {
      id: "ultimate-collection-479",
      text: "You can have it, and be at it, But it never lasts forever.",
      solution: "Peace",
    },
    {
      id: "ultimate-collection-480",
      text: "I have lasted many years and still feel young. I have lasted depressions, recessions and even millenniums. I'm richer than the richest of men. You can visit me, but not my owners. I've been shown on T.V. and I can take and give you what is yours, but only if you ask me to. So tell me who or what I am?",
      solution: "Bank",
    },
    {
      id: "ultimate-collection-481",
      text: "Which popular cheese is made backwards?",
      solution: "Edam",
    },
    {
      id: "ultimate-collection-482",
      text: "I am the ruler of shovels, I have a double, I am as thin as a knife, I have a wife. What am I?",
      solution: "King of spades",
    },
    {
      id: "ultimate-collection-483",
      text: "From that which comes within itself, It builds its table on my shelf.",
      solution: "Spider",
    },
    {
      id: "ultimate-collection-484",
      text: "How can you physically stand behind your friend as he physically stands behind you?",
      solution: "Back to back",
    },
    {
      id: "ultimate-collection-485",
      text: "Poorly behaved children often find themselves sitting in these",
      solution: "Corners",
    },
    {
      id: "ultimate-collection-486",
      text: "I cover what is real and hide what is true, But sometimes I bring out the courage in you. What am I?",
      solution: "Makeup",
    },
    {
      id: "ultimate-collection-487",
      text: "I am a tale in children's minds. I keep their secrets and share them inside. I blur their thoughts into fantasies kept Like a canvas of art or a submarine depth. Though an illusion, it occurs every night; I give them a fantasy, I give them a fright. Nor good or bad, but always nigh' It's interesting to tell. What am I?",
      solution: "Dream",
    },
    {
      id: "ultimate-collection-488",
      text: "Which bow can't be tied?",
      solution: "Rainbow",
    },
    {
      id: "ultimate-collection-489",
      text: "A house with two occupants, sometimes one, rarely three. Break the walls, eat the boarders, then throw away me. What am I?",
      solution: "Peanut",
    },
    {
      id: "ultimate-collection-490",
      text: "What comes once in a century, twice in a lifetime and never in a thousand years?",
      solution: "Letter E",
    },
    {
      id: "ultimate-collection-491",
      text: "I have three hundred cattle, with a single nose cord.",
      solution: "Rosary",
    },
    {
      id: "ultimate-collection-492",
      text: "I am the beginning of sorrow, and the end of sickness. You cannot express happiness without me, yet I am in the midst of crosses. I am always in risk, yet never in danger. You may find me in the sun, but I am never out of darkness.",
      solution: "Letter S",
    },
    {
      id: "ultimate-collection-493",
      text: "A natural state, I'm sought by all. Go with me and you shall fall. You do me when you spend, and you use me when you eat to no end. What am I?",
      solution: "Balance",
    },
    {
      id: "ultimate-collection-494",
      text: "What starts with an e but only has a single letter in it?",
      solution: "Envelope",
    },
    {
      id: "ultimate-collection-495",
      text: "I am rather large and usually majestic. I am every hue of the rainbow I can eat you, I may heat you, You only wish you could see me. What am I?",
      solution: "Dragon",
    },
    {
      id: "ultimate-collection-496",
      text: "Slowly stretching my arms, I rise up, and move towards warmth. Bursting in colors, my sisters and I. What are we?",
      solution: "Flowers",
    },
    {
      id: "ultimate-collection-497",
      text: "Although I'm far from the point, I'm not a mistake. I fix yours. What am I?",
      solution: "Eraser",
    },
    {
      id: "ultimate-collection-498",
      text: "There was a green house. Inside the green house there was a white house. Inside the white house there was a red house. Inside the red house there were lots of babies. What is it?",
      solution: "Watermelon",
    },
    {
      id: "ultimate-collection-499",
      text: "What fastens two people yet touches only one?",
      solution: "Wedding ring",
    },
    {
      id: "ultimate-collection-500",
      text: "What ship has no captain but two mates?",
      solution: "Courtship",
    },
    {
      id: "ultimate-collection-501",
      text: "In my life I die twice, once wrapped in silk, once covered in dust.",
      solution: "Butterfly",
    },
    {
      id: "ultimate-collection-502",
      text: "How do share 17 apples with 18 people?",
      solution: "Applesauce",
    },
    {
      id: "ultimate-collection-503",
      text: "My first is in blood and also in battle, My second is in acorn, oak, and apple, My third and fourth are both the same, In the center of sorrow and twice in refrain, My fifth starts eternity ending here, My last is the first of last, Oh dear!",
      solution: "Barrel",
    },
    {
      id: "ultimate-collection-504",
      text: "I am and yet cannot. I am an Idea, yet can rot I am two but none. I am on land, but on sea. What am I?",
      solution: "Island",
    },
    {
      id: "ultimate-collection-505",
      text: "What is gold when old and silver when new, hard to find but easy to lose, cost a lot but it's free?",
      solution: "Friend",
    },
    {
      id: "ultimate-collection-506",
      text: "What can't you see that is always before you?",
      solution: "Future",
    },
    {
      id: "ultimate-collection-507",
      text: "One where none should be, Or maybe where two should be, Seeking out purity, In the kings trees. What am I?",
      solution: "Partridge",
    },
    {
      id: "ultimate-collection-508",
      text: "Wounded I am, and weary with fighting; Gashed by iron, gored by the point of it, Sick of battle-work, battered and scarred. Many a fearful fight have I seen, when Hope there was none, or helping the thick of it.",
      solution: "Shield",
    },
    {
      id: "ultimate-collection-509",
      text: "I'm that which is seen only in darkness, Swiftest of all, and near as old as time; Day's distant brother; fire and faintness, I light without shadow -- can you solve this rhyme?",
      solution: "Star",
    },
    {
      id: "ultimate-collection-510",
      text: "All day long it's in and out. I discharge loads from my shaft. Both men and women go down on me. What am I?",
      solution: "Elevator",
    },
    {
      id: "ultimate-collection-511",
      text: "What do you call a wild card?",
      solution: "Joker",
    },
    {
      id: "ultimate-collection-512",
      text: "Two arms, one leg and a head, but no eyes.",
      solution: "Shirt",
    },
    {
      id: "ultimate-collection-513",
      text: "What kind of tree is carried in your hand?",
      solution: "Palm",
    },
    {
      id: "ultimate-collection-514",
      text: "Where is 11+2=1?",
      solution: "Clock",
    },
    {
      id: "ultimate-collection-515",
      text: "Has a blade of jagged cut. Keeps the quickest hand out shut. Goes in darkness. Wears a ring. One is quiet. Many sing.",
      solution: "Saw",
    },
    {
      id: "ultimate-collection-516",
      text: "Four feet, Jagged teeth Fleet of movement, water and land I have no mood; to me you're food As I drag you under.",
      solution: "Crocodile",
    },
    {
      id: "ultimate-collection-517",
      text: "What happens when you throw a blue rock into the yellow sea?",
      solution: "Sinks",
    },
    {
      id: "ultimate-collection-518",
      text: "What runs around the yard without moving?",
      solution: "Fence",
    },
    {
      id: "ultimate-collection-519",
      text: "Tires a horse, worries a man; Tell me this riddle if you can.",
      solution: "Debt",
    },
    {
      id: "ultimate-collection-520",
      text: "Two bodies have I, though both joined in one. The more still I stand, the quicker I run. What am I?",
      solution: "Hourglass",
    },
    {
      id: "ultimate-collection-521",
      text: "What kind of table has no legs?",
      solution: "Periodic table",
    },
    {
      id: "ultimate-collection-522",
      text: "Some try to hide, some try to cheat, but time will show, we always will meet. Try as you might, to guess my name, I promise you'll know when you I do claim. Who am I?",
      solution: "Death",
    },
    {
      id: "ultimate-collection-523",
      text: "A man is writing a letter. The power goes off and he dies. Why?",
      solution: "Lighthouse keeper",
    },
    {
      id: "ultimate-collection-524",
      text: "I show things that can be funny, sad, shocking and other emotions. Some people are obsessed some only go a few times. I hold everything that someone wants to be shown.",
      solution: "Movie theater",
    },
    {
      id: "ultimate-collection-525",
      text: "My first is in window but not in pane, my second's in road but not in lane, my third is in oval but not in round, my fourth is in hearing but not in sound, my whole is known as a sign of peace, and from Noah's ark won quick release.",
      solution: "Dove",
    },
    {
      id: "ultimate-collection-526",
      text: "Who gets paid when they drive away their customers?",
      solution: "Taxi driver",
    },
    {
      id: "ultimate-collection-527",
      text: "What is yellow, has wheels, and brightens up mother's day?",
      solution: "School bus",
    },
    {
      id: "ultimate-collection-528",
      text: "When I plunged it in it was dry; when I drew it out it was dripping.",
      solution: "Teabag",
    },
    {
      id: "ultimate-collection-529",
      text: "One tooth to bite, he's the forests foe. One tooth to fight, as all Norse know. What is it?",
      solution: "Axe",
    },
    {
      id: "ultimate-collection-530",
      text: "Use me wisely, For I am hard to find. To your aquatic needs, I will be kind. It may not be worth my slime and grime, For I run out in an hour's time. What am I?",
      solution: "Hourglass",
    },
    {
      id: "ultimate-collection-531",
      text: "Apples for leather, leather for silk, Silk for tobacco, all to get milk.",
      solution: "Trade",
    },
    {
      id: "ultimate-collection-532",
      text: "He laughs plain and talks plain but haven't any life.",
      solution: "Portrait",
    },
    {
      id: "ultimate-collection-533",
      text: "Fatherless and Motherless, born without sin Roared when it came into the world, And never spoke again.",
      solution: "Thunder",
    },
    {
      id: "ultimate-collection-534",
      text: "Halo of water, tongue of wood Skin of stone, long I've stood. My fingers short reach to the sky Inside my heart men live and die.",
      solution: "Castle",
    },
    {
      id: "ultimate-collection-535",
      text: "What has holes on each side, but can still hold water?",
      solution: "Sponge",
    },
    {
      id: "ultimate-collection-536",
      text: "The higher I climb, the hotter I engage, I cannot escape my crystal cage.",
      solution: "Mercury",
    },
    {
      id: "ultimate-collection-537",
      text: "What has 6 wheels and flies?",
      solution: "Garbage truck",
    },
    {
      id: "ultimate-collection-538",
      text: "If not preceded by the smaller the larger one will not go.",
      solution: "Key",
    },
    {
      id: "ultimate-collection-539",
      text: "On your desk, Or on the floor, You might just find one of my forms. With tails, without tails. Gray, black, or even white. If you see me, You might scream with fear, Or you might use me to work on what is near. What am I?",
      solution: "Mouse",
    },
    {
      id: "ultimate-collection-540",
      text: "Of all the things that are broken, this makes the least noise And is always done on purpose.",
      solution: "Fast",
    },
    {
      id: "ultimate-collection-541",
      text: "First I am one, then I seem none, in death I birth new life. What's raised exceeds me, for on bent knee, I add to a world that's rife. What am I?",
      solution: "Seed",
    },
    {
      id: "ultimate-collection-542",
      text: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      solution: "Letter M",
    },
    {
      id: "ultimate-collection-543",
      text: "The restraining hand It keeps us from going From doing horrible things Hard to live with What is it?",
      solution: "Conscience",
    },
    {
      id: "ultimate-collection-544",
      text: "My scrawny friend, weeps when he stride.",
      solution: "Broom",
    },
    {
      id: "ultimate-collection-545",
      text: "What can go up a drainpipe down but not down a drainpipe up?",
      solution: "Umbrella",
    },
    {
      id: "ultimate-collection-546",
      text: "What has yellow skin and writes?",
      solution: "Ballpoint banana",
    },
    {
      id: "ultimate-collection-547",
      text: "Shoot at me a thousand times and I may still survive; one scratch from you and me will find your prospects take a dive. What am I?",
      solution: "Eight ball",
    },
    {
      id: "ultimate-collection-548",
      text: "You throw away the outside and cook the inside. Then you eat the outside and throw away the inside.",
      solution: "Corn",
    },
    {
      id: "ultimate-collection-549",
      text: "I'm in cooper But not in dog I'm in percent but not in MONEY What I'm I?",
      solution: "Letter P",
    },
    {
      id: "ultimate-collection-550",
      text: "My voice is tender, my waist is slender and I'm often invited to play. Yet wherever I go I must take my bow or else I have nothing to say. What am I?",
      solution: "Violin",
    },
    {
      id: "ultimate-collection-551",
      text: "Name an eight-letter word that has kst in the middle, in the beginning, and at the end.",
      solution: "Inkstand",
    },
    {
      id: "ultimate-collection-552",
      text: "What is it that after you take away the whole, some still remains?",
      solution: "Wholesome",
    },
    {
      id: "ultimate-collection-553",
      text: "I am something many people don't enjoy having as a friend, including you. But I am called upon anytime someone is injured. I have 5 letters and when my last letter is put before my first letter, I become a country. What am I?",
      solution: "Spain",
    },
    {
      id: "ultimate-collection-554",
      text: "What tastes better than it smells?",
      solution: "Tongue",
    },
    {
      id: "ultimate-collection-555",
      text: "With pointed fangs I sit and wait, with piercing force I serve out fate. Grabbing bloodless victims, proclaiming my might; physically joining with a single bite. What am I?",
      solution: "Stapler",
    },
    {
      id: "ultimate-collection-556",
      text: "My first is in FLOWER and in ROSE My second is in FORK and well as HOSE My third is in CROCUS but not in GNOME My fourth is in RAKE never in HOME My fifth is in HOE and also in WEEDS My sixth is in SHEARS though not in SEEDS My seventh is in LADYBIRD not in CREATURE What am I?",
      solution: "Flowers",
    },
    {
      id: "ultimate-collection-557",
      text: "He has married many women, but has never been married. Who is he?",
      solution: "Priest",
    },
    {
      id: "ultimate-collection-558",
      text: "A muttered rumble was heard from the pen, And I, in my walking, stopped to look in. What was this I saw? A massive beast, hooved, and jawed. With spikes upon its mighty brow, I watched as he struck the turf and prowled. And yet for all of his magnificence, He couldn't get out of that wooden fence.",
      solution: "Bull",
    },
    {
      id: "ultimate-collection-559",
      text: "What can be felt yet has neither length, breadth nor thickness?",
      solution: "Emotion",
    },
    {
      id: "ultimate-collection-560",
      text: "I'm almost next to Merlin When it comes to his fame Though to many men I can be a pain For I can be in the way When I'm left too long But to the wise, I might say They sometimes think I belong. What am I?",
      solution: "Beard",
    },
    {
      id: "ultimate-collection-561",
      text: "If you stay below me, you'll never go through But usually that is not what people do",
      solution: "Door",
    },
    {
      id: "ultimate-collection-562",
      text: "There are 3 words in the English language. These three words all end in -gry. One is hungry, the other is angry. The third is one that you use every day, if you were paying attention I already gave you the answer.",
      solution: "Language",
    },
    {
      id: "ultimate-collection-563",
      text: "I open to close but I close to open. I'm surrounded by water but I'm never soaking. What am I?",
      solution: "Drawbridge",
    },
    {
      id: "ultimate-collection-564",
      text: "To give me to someone I don't belong to is cowardly, but to take me is noble. I can be a game, but nobody wins. What am I?",
      solution: "Blame",
    },
    {
      id: "ultimate-collection-565",
      text: "I have an end but no beginning, a home but no family, a space without room. I never speak but there is no word I cannot make. What am I?",
      solution: "Keyboard",
    },
    {
      id: "ultimate-collection-566",
      text: "If I smile it also smiles. If I cry it also cries. If I shout it does nothing. What is it?",
      solution: "Mirror",
    },
    {
      id: "ultimate-collection-567",
      text: "What stays where it is when it goes off?",
      solution: "Alarm clock",
    },
    {
      id: "ultimate-collection-568",
      text: "I was not born, but I am here. I have no name, but I am given many. I was made by science and life.",
      solution: "Clone",
    },
    {
      id: "ultimate-collection-569",
      text: "An island pig with a hair as hard as a nail.",
      solution: "Porcupine",
    },
    {
      id: "ultimate-collection-570",
      text: "When I'm used, I'm useless, once offered, soon rejected. In desperation oft expressed, the intended not protected. What am I?",
      solution: "Excuse",
    },
    {
      id: "ultimate-collection-571",
      text: "I have lakes with no fish. I have roads with no cars.",
      solution: "Map",
    },
    {
      id: "ultimate-collection-572",
      text: "Four hang, four sprang, two point the way, two to ward off dogs, one dangles after, always rather dirty. What am I?",
      solution: "Cow",
    },
    {
      id: "ultimate-collection-573",
      text: "I know what you're wearing but cannot see. I know what you're eating but cannot smell. I know what you're what you're doing but cannot hear. What am I?",
      solution: "Scale",
    },
    {
      id: "ultimate-collection-574",
      text: "With sharp edged wit and pointed poise, it can settle disputes without making a noise. What is it?",
      solution: "Sword",
    },
    {
      id: "ultimate-collection-575",
      text: "What has 4 legs in the morning, 2 legs in the afternoon and 3 legs at night?",
      solution: "Human",
    },
    {
      id: "ultimate-collection-576",
      text: "There is a bush fit for the nonce That beareth pricks and precious stones The fruit in fear some ladies pull. Tis smooth and round and plump and full... They put it in, and then they move it, Which makes it melt, and then they love it. So what was round, plump, full and hard Grows lank and thin and dull and marred...",
      solution: "Strawberry",
    },
    {
      id: "ultimate-collection-577",
      text: "You hear it speak, for it has a hard tongue. But it cannot breathe, for it has not a lung. What is it?",
      solution: "Bell",
    },
    {
      id: "ultimate-collection-578",
      text: "You throw me out when you need me; you bring me back when you're done. What am I?",
      solution: "Anchor",
    },
    {
      id: "ultimate-collection-579",
      text: "I weigh a lot but backwards I am not. What am I?",
      solution: "Ton",
    },
    {
      id: "ultimate-collection-580",
      text: "There's a boy. What's his name?",
      solution: "Theresa Boy",
    },
    {
      id: "ultimate-collection-581",
      text: "7 months have 31 days. How many months have 28 days?",
      solution: "All of them",
    },
    {
      id: "ultimate-collection-582",
      text: "Twigs and spheres and poles and plates, join and bind to reason make.",
      solution: "Molecule",
    },
    {
      id: "ultimate-collection-583",
      text: "I am green but not a tree And I grow around the world What am I?",
      solution: "Moss",
    },
    {
      id: "ultimate-collection-584",
      text: "There is a thing on earth that God could do but didn't, the devil hadn't got the power, and men do it.",
      solution: "Repent",
    },
    {
      id: "ultimate-collection-585",
      text: "In a tunnel of darkness lies a beast of iron. It can only attack when pulled back.",
      solution: "Bullet",
    },
    {
      id: "ultimate-collection-586",
      text: "A man shaves several times a day, yet he still has a beard. Who is this man?",
      solution: "Barber",
    },
    {
      id: "ultimate-collection-587",
      text: "I drive men mad. For love of me, Easily beaten, never free.",
      solution: "Gold",
    },
    {
      id: "ultimate-collection-588",
      text: "What kind of umbrella do most people carry on a rainy day?",
      solution: "Wet one",
    },
    {
      id: "ultimate-collection-589",
      text: "It can only exist between any two things And men know it well for the hardships it brings.",
      solution: "Distance",
    },
    {
      id: "ultimate-collection-590",
      text: "What type of son does no parent want?",
      solution: "Arson",
    },
    {
      id: "ultimate-collection-591",
      text: "What belongs to you but others use it more than you do?",
      solution: "Name",
    },
    {
      id: "ultimate-collection-592",
      text: "You can do it in vessels for getting you clean. You can do it to fabric to stop being seen. You are doing it when you've come up short. You've done it too when you've equaled in sport. This may sound like there should be images but then you can do all those things without pencil or pen. What is the word?",
      solution: "Draw",
    },
    {
      id: "ultimate-collection-593",
      text: "It runs having no feet and it roars having no mouth.",
      solution: "River",
    },
    {
      id: "ultimate-collection-594",
      text: "I am an insect and the first half of my name reveals another insect. Some famous musicians had a name similar to mine. What am I?",
      solution: "Beetle",
    },
    {
      id: "ultimate-collection-595",
      text: "The one who makes it sells it. The one who buys it doesn't use it. The one who's using it doesn't know he's using it. What is it?",
      solution: "Coffin",
    },
    {
      id: "ultimate-collection-596",
      text: "What's made of wood but can't be sawed?",
      solution: "Sawdust",
    },
    {
      id: "ultimate-collection-597",
      text: "It never goes airborne, Yet, still, it may land.",
      solution: "Punch",
    },
  ],
};
