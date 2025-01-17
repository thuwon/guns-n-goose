import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

export const db = GUN();
export const db_user = db.user().recall({sessionStorage: true});
export const user = writable('');

db_user.get('alias').on(v => user.set(v))

db.on('auth', async(event) => {
    const alias = await db_user.get('alias');
    user.set(alias);
});
