export default function(target: object) {
    return Object.keys(target).filter(x => isNaN(+x))
}
