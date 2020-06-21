const projects = [
  {
    id: '1',
    private: false,
    name: 'My Public Post',
    description: 'Description',
    figma: null,
    invision: null,
    mainImg: 'https://i.imgur.com/EMlwt0i.png',
  },
  {
    id: '2',
    private: false,
    name: 'My Other Public Post',
    description: 'Other Description',
    figma: null,
    invision: null,
    mainImg: 'https://i.imgur.com/jidEDG6.png',
  },
];

const project = {
  id: '1',
  private: false,
  name: 'My Public Post',
  description: 'Description',
  figma: null,
  invision: null,
  mainImg: 'https://i.imgur.com/EMlwt0i.png',
};

const addProject = {
  userId: 'abc1225475645456',
  private: true,
  name: 'testing',
  description: 'i am a tester for the update',
  mainImg: 'wwwkjhbnkjnbcxc',
};

const updateProject = {
  id: '3',
  userId: 'abc1225475645456',
  name: 'testing updates',
  description: 'i am a tester for the update again',
  mainImg: 'wwwkjhbnkjnbcxcasdf',
};

module.exports = { projects, project, addProject, updateProject };
