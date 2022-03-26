import Fuse from 'fuse.js';


const players = ['Saif Ali',
'Fayeque',
'Buni',
'Aquib',
'Chotu',
'Sheru Bhai',
'Sohrab Bhai',
'Azad Bhai',
'Atif',
'Irfan',
'Danish(Makkhi)',
'Saddam Bhai',
'Danish',
'Sabbir Bhai',
'Paale',
'Faiz',
'Raj Bhai',
'Tutu Bhai',
'Tipu Bhai',
'Wajid Bhai',
'Bikki',
'Akil Bhai'];

const fuzzySearch  = (name) => {
    const f = new Fuse(players);
    var res=f.search(name);
    return res;
}

export default fuzzySearch;


