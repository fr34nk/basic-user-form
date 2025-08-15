
const AVATAR_PATH='avatars'

const AVATAR_NAMES = [
    "avatar_female_01.png",
    "avatar_female_02.png",
    "avatar_female_03.png",
    "avatar_female_04.png",
    "avatar_female_05.png",
    "avatar_male_01.png",
    "avatar_male_02.png",
    "avatar_male_03.png",
    "avatar_male_04.png",
]

export function getRandomAvatar () {
    const n = Math.round(Math.random() * 10)
    return AVATAR_PATH + '/' + AVATAR_NAMES[Math.round((Math.random() * AVATAR_NAMES.length))]
}