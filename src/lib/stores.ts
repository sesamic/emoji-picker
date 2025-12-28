import { writable, type Writable } from 'svelte/store';
import type { IEmoji } from './types';

interface PickerState {
    skinStore: Writable<number>;
    searchValueStore: Writable<string>;
    footerEmojiStore: Writable<IEmoji | null>;
    searchPlaceholderStore: Writable<string>;
    actions: {
        changeFooterEmoji: (emoji: IEmoji | null) => void;
        changeSearchbarPlaceholder: (placeholder: string) => void;
        setSkin: (skin: number) => void;
        setSearchValue: (val: string) => void;
    }
}

const pickers = new Map<string, PickerState>();

export function getPickerState(id: string): PickerState {
    if (!pickers.has(id)) {
        const skinStore = writable(0);
        const searchValueStore = writable("");
        const footerEmojiStore = writable<IEmoji | null>(null);
        const searchPlaceholderStore = writable("");

        const state: PickerState = {
            skinStore,
            searchValueStore,
            footerEmojiStore,
            searchPlaceholderStore,
            actions: {
                changeFooterEmoji: (emoji) => footerEmojiStore.set(emoji),
                changeSearchbarPlaceholder: (val) => searchPlaceholderStore.set(val),
                setSkin: (skin) => skinStore.set(skin),
                setSearchValue: (val) => searchValueStore.set(val)
            }
        };
        pickers.set(id, state);
    }
    return pickers.get(id)!;
}