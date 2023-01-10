import axios from 'axios';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { methods } from '../methods';

//  Get All Projects
export async function projects () {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      type: 'Project'
    }

  };

  return await axios(config);
}

//  Get a Project
export async function project (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      id: data.id
    }
  };

  return await axios(config);
}

//  Get my Project
export async function myProjects () {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'get',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.GET,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    params: {
      q: `orderBy=="${jwt.decode(token).id}"`,
      type: 'Project'
    }
  };

  return await axios(config);
}

//  Create Project
export async function saveProject (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.POST,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
  };

  return await axios(config);
}

//  Update Project
export async function updateProject (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'post',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.UPDATE,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>; rel="http://www.w4.org/ns/json-ld#context"; type="application/ld+json"',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
    params: {
      options: 'replace'
    }
  };

  return await axios(config);
}

//  Delete Project
export async function deleteProject (data) {
  const { auth_token: token } = parseCookies();

  const config = {
    method: 'delete',
    url: process.env.NEXT_PUBLIC_FRONT_API_URL_DEV + methods.DELETE + data.id,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/ld+json',
      'Fiware-Service': process.env.NEXT_PUBLIC_FIWARE_SERVICE
    },
    data,
  };

  return await axios(config);
}
