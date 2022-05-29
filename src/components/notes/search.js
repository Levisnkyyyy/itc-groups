import { Flex, Button, Input, IconButton, Select } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from "@chakra-ui/icons"
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import NotesContext from '../../contexts/notesContext';

export default function Search() {
  const { setFilters, filters } = useContext(NotesContext);
  const [searchingFor, setSearchingFor] = useState('content');
  const [input, setInput] = useState('');

  const isSearchActive = useMemo(() => !!filters.find((f) => ['content', 'username'].includes(f.property)), [filters]);

  const clickHandler = useCallback(() => {

    setFilters((cur) => {
      const draft = JSON.parse(JSON.stringify(cur));
      const found = draft.find((f) => f.property === searchingFor);
      if (found) {
        found.value = searchingFor === 'content' ? input.split(' ') : input;
      } else {
        return [...cur, {
          property: searchingFor,
          operator: searchingFor === 'content' ? 'array-contains-any' : '==',
          value: searchingFor === 'content' ? input.split(' ') : input,
        }];
      }
      return draft;

    });
  }, [input, searchingFor, setFilters]);

  const resetSearch = useCallback(() => {
    setInput('');
    setFilters((cur) => cur.filter((f) => !['content', 'username'].includes(f.property)));
  }, [setFilters]);

  useEffect(() => {
    resetSearch();
  }, [searchingFor, resetSearch]);

  return (
    <Flex
      borderRadius="4px"
      maxWidth="700px"
      margin="20px auto"
      padding="3"
      bgColor="gray.700"
      align="center"
      boxShadow="base" // https://chakra-ui.com/docs/features/style-props
    >
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Make a search" />
      <Button sx={{ flexShrink: 0 }} colorScheme="blue" onClick={clickHandler} px="2" leftIcon={<SearchIcon />}>
        {`Search for ${searchingFor}`}
      </Button>
      <Select onChange={(e) => setSearchingFor(e.target.value)} value={searchingFor}>
        <option value="content">Content</option>
        <option value="username">user</option>
      </Select>
      {isSearchActive && <IconButton colorScheme="gray" onClick={resetSearch} icon={<CloseIcon />} />}
    </Flex>
  )
}