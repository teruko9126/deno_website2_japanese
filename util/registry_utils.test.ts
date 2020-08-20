/* eslint-env jest */

import {
  getSourceURL,
  VersionMetaInfo,
  getRepositoryURL,
  getVersionMeta,
  getVersionList,
  getModule,
} from "./registry_utils";
import "isomorphic-unfetch";

test("source url", () => {
  expect(getSourceURL("ltest2", "0.0.8", "/README.md")).toEqual(
    "https://cdn.deno.land/ltest2/versions/0.0.8/raw/README.md"
  );
});

const versionMeta: VersionMetaInfo = {
  uploadedAt: new Date("2020-08-08T12:22:43.759Z"),
  directoryListing: [
    {
      path: "",
      size: 2317,
      type: "dir",
    },
    {
      path: "/subproject",
      size: 425,
      type: "dir",
    },
    {
      path: "/.github",
      size: 716,
      type: "dir",
    },
    {
      path: "/.github/workflows",
      size: 412,
      type: "dir",
    },
    {
      path: "/fixtures",
      size: 23,
      type: "dir",
    },
    {
      path: "/mod.ts",
      size: 87,
      type: "file",
    },
    {
      path: "/subproject/README.md",
      size: 354,
      type: "file",
    },
    {
      path: "/subproject/mod.ts",
      size: 71,
      type: "file",
    },
    {
      path: "/.github/workflows/ci.yml",
      size: 412,
      type: "file",
    },
    {
      path: "/LICENSE",
      size: 1066,
      type: "file",
    },
    {
      path: "/.github/README.md",
      size: 304,
      type: "file",
    },
    {
      path: "/fixtures/%",
      size: 23,
      type: "file",
    },
  ],
  uploadOptions: {
    type: "github",
    repository: "luca-rand/testing",
    ref: "0.0.8",
  },
};

test("getRepositoryURL", () => {
  expect(getRepositoryURL(versionMeta, "/README.md")).toEqual(
    "https://github.com/luca-rand/testing/tree/0.0.8/README.md"
  );
});

test("getVersionMeta", async () => {
  expect(await getVersionMeta("ltest2", "0.0.7")).toEqual(null);
  expect(await getVersionMeta("ltest2", "0.0.8")).toEqual(versionMeta);
});

test("getVersionList", async () => {
  const versionList = await getVersionList("ltest2");
  expect(versionList).toBeTruthy();
  expect(versionList?.isLegacy).toEqual(undefined);
  expect(versionList?.latest).toEqual(versionList?.versions[0]);
  expect(versionList?.versions.length).toBeGreaterThanOrEqual(2);
});

test("getModule", async () => {
  expect(await getModule("ltest2")).toEqual({
    name: "ltest2",
    description: "Move along, just for testing",
    // eslint-disable-next-line @typescript-eslint/camelcase
    star_count: 2,
  });
});
