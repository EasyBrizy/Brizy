import { PageData } from "./pageData";
import { ProjectData } from "./projectData";

export type Response<R> = (r: R) => void;

//#region Page

export type PageDataOutput = PageData;

//#endregion

//#region Project

export type ProjectDataOutput = ProjectData;

//#endregion

export type Choice = {
  title: string;
  value: string | number;
};
