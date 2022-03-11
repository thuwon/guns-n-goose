import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

const db = GUN();
const db_user = db.user().recall({sessionStorage: true});

//db_user.get('alias').on(v => console.log(v));
//console.log(db_user.get('alias')._);
//(async () => { console.log(await db_user.get('alias')._.put) })()

function userStore() {

  const { subscribe, set } = writable('');

  db_user.get('alias').on(v => set(v));

  const register = (username, password) => {
    db_user.create(username, password, ({ err }) => {
      if (err) alert(err);
      else login(username, password)
    })
  }

  const login = (username, password) => {
    db_user.auth(username, password, ({ err }) => {
      if (err) alert(err);
      else {
        set(username);
        window.location.reload();
      }
    })
  }

  const logout = () => {
    db_user.leave();
    set('');
    window.location.reload();
  }

  return { subscribe, register, login, logout };
}

export const user = userStore();