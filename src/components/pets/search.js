import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useMemo, useState } from "react";




/**
 * FILTERLINE

{
  id: uuid,
  field: 'name' || 'type' || 'status',
  operator: 'Equals', 'Not Equals', 'Contains',
  value: 'doggy',
}



 */

export default function SearchPets({ submitHandler }) {
  const [filterLines, setFilterLines] = useState([]);


  const isSubmitDisabled = useMemo(() => filterLines.reduce((acc, curLine) => {
    if (!curLine.value) return true;
    return acc;
  }, false), [filterLines]);


  const errors = useMemo(() => {
    const obj = {};
    filterLines.forEach((line) => {
      // validations
      if (!line.value) {
        obj[line.id] = 'value';
      }
    })
    return obj;
  }, [filterLines]);

  const onSubmit = useCallback(() => {
    submitHandler(filterLines);
  }, [filterLines, submitHandler]);


  const addLine = useCallback(() => {
    setFilterLines((cur) => [...cur, {
      id: uuidv4(),
      field: 'name',
      operator: 'eq',
      value: '',
    }])
  }, []);

  const removeLine = useCallback((lineId) => {
    setFilterLines((cur) => cur.filter((l) => l.id !== lineId));
  }, []);

  const updateLine = useCallback((lineId, key, value) => {
    const lines = JSON.parse(JSON.stringify(filterLines));

    const line = lines.find((l) => l.id === lineId);
    line[key] = value;

    setFilterLines(lines);
  }, [filterLines]);


  const reset = useCallback(() => {
    setFilterLines([]);
    submitHandler([]);
  }, [submitHandler]);
  return (
    <Box
      borderRadius="4px"
      maxWidth="700px"
      margin="20px auto"
      padding="3"
      bgColor="gray.700"
      alignItems="center"
      boxShadow="base" // https://chakra-ui.com/docs/features/style-props
    >
      <Button colorScheme="blue" w="100%" onClick={addLine}>Add</Button>
      {filterLines.map((line) => (
        <FilterLine key={line.id} line={line} updateLine={updateLine} errors={errors} removeLine={removeLine} />
      ))}
      {filterLines.length > 0 && (
        <Flex>
          <Button isDisabled={isSubmitDisabled} colorScheme="green" onClick={onSubmit}>Submit</Button>
          <Button onClick={reset}>Reset</Button>
        </Flex>
      )}
    </Box>
  )
}


const FilterLine = ({ updateLine, line, errors, removeLine }) => {

  const ValueTemplate = useMemo(() => {
    if (line.field === 'type') {
      return (
        <Select value={line.value} onChange={(e) => updateLine(line.id, 'value', e.target.value)}>
          <option value="" disabled>Select type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="hamster">Hamster</option>
        </Select>
      )
    }

    return (
      <Input
        isInvalid={errors?.[line.id] === 'value'}
        errorBorderColor='red.300'
        value={line.value}
        onChange={(e) => updateLine(line.id, 'value', e.target.value)}
      />
    )
  }, [line, errors, updateLine])

  return (
    <Flex mt="3" key={line.id}>
      <Select value={line.field} onChange={(e) => updateLine(line.id, 'field', e.target.value)}>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="status">Status</option>
      </Select>
      <Select value={line.operator} onChange={(e) => updateLine(line.id, 'operator', e.target.value)}>
        <option value="eq">Equals</option>
        <option value="neq">Not equals</option>
        <option value="con">Contains</option>
      </Select>
      {ValueTemplate}
      <Button w="80px" colorScheme="red" onClick={() => removeLine(line.id)}>DEL</Button>
    </Flex>
  )
}