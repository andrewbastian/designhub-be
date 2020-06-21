const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  projects,
  project,
  addProject,
  updateProject,
} = require('../../__utils__/projectsResponse');

let server;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await knex.migrate.latest();
  return knex.seed.run();
});

afterAll(() => {
  return knex.migrate.rollback().then(() => knex.destroy());
});

const projectsQuery = `
query Projects {
    projects {
      id
      private
      name
      description
      figma
      invision
      mainImg
    }
  }
  `;

const projectQuery = `
  query Project($id: ID!) {
    project(id:$id) {
      id
      private
      name
      description
      figma
      invision
      mainImg
    }
  }
  `;

const addProjectMutation = `
  mutation addProject($data: ProjectInput!){
    addProject(data:$data){
      userId
      private
      name
      description
      mainImg
    }
  }
  `;

const updateProjectMutation = `
    mutation updateProject($data: UpdateProjectInput!){
        updateProject(data:$data){
        id
        userId
        name
        description
        mainImg
        }
    }
    `;

const deleteProjectMutation = `
    mutation deleteProject($id:ID!){
      deleteProject(id:$id)
    }
    `;

describe('Projects Resolvers 🌸', () => {
  it('Gets all projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: projectsQuery,
    });
    expect(res).toMatchObject({
      data: {
        projects,
      },
    });
  });

  it('Gets 1 Project 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: projectQuery,
      variables: {
        id: '1',
      },
    });
    expect(res).toMatchObject({
      data: {
        project,
      },
    });
  });

  it('Adds projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addProjectMutation,
      variables: {
        data: {
          userId: 'abc1225475645456',
          private: true,
          name: 'testing',
          description: 'i am a tester for the update',
          mainImg: 'wwwkjhbnkjnbcxc',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        addProject,
      },
    });
  });

  it('Updates projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateProjectMutation,
      variables: {
        data: {
          id: '3',
          userId: 'abc1225475645456',
          name: 'testing updates',
          description: 'i am a tester for the update again',
          mainImg: 'wwwkjhbnkjnbcxcasdf',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateProject,
      },
    });
  });

  it('Deletes project 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteProjectMutation,
      variables: {
        id: '3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteProject: true,
      },
    });
  });
});
