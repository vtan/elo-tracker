import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { Group } from "../Group"

export interface Props {
  groups: ReadonlyArray<Group>
}

export function GroupSelectorPage({ groups }: Props) {
  return <>
    <h1>Groups</h1>

    { groups.map(group =>
        <GroupLink key={group.id} to={`/${group.urlName}`}>{group.name}</GroupLink>
    ) }
  </>
}

const GroupLink = styled(Link)`
  display: block;
  max-width: 320px;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem;

  border: 1px #ddd solid;
  color: #222;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;

  &:visited {
    color: #222;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`
