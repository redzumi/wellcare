import { createStore, createEvent, Event, Store } from 'effector';

const $ui: Store<UIState> = createStore({ media: UIMedia.Mobile });
$ui.watch((state) => console.log(`[$UI]: `, state));

const setUIMedia: Event<UIMedia> = createEvent();

$ui.on(setUIMedia, (state, media) => ({ ...state, media }));

export { $ui, setUIMedia };
