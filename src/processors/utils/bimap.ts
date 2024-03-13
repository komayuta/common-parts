export class BiMap<K, V> {
    private readonly map = new Map<K, V>();
    private readonly inverseMap = new Map<V, K>();

    public constructor(data: Array<[K, V]>) {
        for (const [k, v] of data) {
            this.map.set(k, v);
            this.inverseMap.set(v, k);
        }
    }

    public getValue(key?: K): V | undefined {
        return key === undefined ? undefined : this.map.get(key);
    }

    public getKey(value?: V): K | undefined {
        return value === undefined ? undefined : this.inverseMap.get(value);
    }

    public containsKey(key: any): key is K {
        return key !== undefined && this.map.has(key);
    }

    public containsValue(value: any): value is V {
        return value !== undefined && this.inverseMap.has(value);
    }
}
