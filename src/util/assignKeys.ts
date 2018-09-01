export default function<T>(target: T, keys: Array<keyof T>, source: T) : T {
    keys.forEach(key => target[key] = source[key]);
    return target;
}
