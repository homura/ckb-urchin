import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';

export const SearchBar: React.FC = () => {
  const onSearch = useCallback(() => {
    // TODO
  }, []);

  return (
    <FormControl onSubmit={onSearch}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          isDisabled
          placeholder="Block Hash / Transaction Hash / Address / Block Number"
        />
      </InputGroup>
    </FormControl>
  );
};
