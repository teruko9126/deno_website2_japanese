/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */

import React, { useMemo } from "react";
// import Link from "next/link";
import {
  DependencyGraph as DependencyGraphType,
  graphToTree,
  Dep,
} from "../util/registry_utils";
import Link from "next/link";

function DependencyGraph({
  graph,
  entrypoint,
  currentModule,
}: {
  graph: DependencyGraphType;
  entrypoint: string;
  currentModule: string;
}) {
  const tree = useMemo(() => {
    const tree = graphToTree(graph, entrypoint);
    return tree;
  }, [graph, entrypoint]);

  if (tree === undefined) return null;

  return (
    <div className="whitespace-no-wrap overflow-x-auto">
      <ul>
        <Node node={tree} currentModule={currentModule} />
      </ul>
    </div>
  );
}

function Node({ node, currentModule }: { node: Dep; currentModule: string }) {
  const name = node.name.startsWith(currentModule)
    ? "~/" + node.name.substring(currentModule.length)
    : node.name;
  const url = node.name.startsWith("https://deno.land/x/std")
    ? node.name.replace("https://deno.land/x/std", "https://deno.land/std")
    : node.name;
  return (
    <li>
      <p className="overflow-hidden inline">
        {url.startsWith("https://deno.land/std") ? (
          <Link href="/[...rest]" as={url.replace("https://deno.land", "")}>
            <a href={url} className="link text-sm truncate">
              {name}
            </a>
          </Link>
        ) : url.startsWith("https://deno.land/x/") ? (
          <Link href="/x/[...rest]" as={url.replace("https://deno.land", "")}>
            <a href={url} className="link text-sm truncate">
              {name}
            </a>
          </Link>
        ) : (
          <a href={url} className="link text-sm truncate">
            {name}
          </a>
        )}
      </p>
      <ul className="tree">
        {node.children.map((node) => (
          <Node key={node.name} node={node} currentModule={currentModule} />
        ))}
      </ul>
    </li>
  );
}

export default DependencyGraph;
