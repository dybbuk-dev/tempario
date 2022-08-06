import { useState, ChangeEvent } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Button,
    Stack,
    Flex
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface FileUploadProps {
    label?: string;
    required?: boolean;
    name: string;
}

const FileUpload = (props: FileUploadProps) => {
    const { label, required, name } = props;
    const [files, setFiles] = useState<any[]>([]);

    const addFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            // setImage(event.target.files[0]);

            const _files: any[] = files.slice(0, files.length);
            const file: any = event.target.files[0];
            _files.push(file);
            setFiles(_files);
        }
    }

    const FileItem = ({ file, index }: { file: any, index: number }) => {
        const removeFile = () => {
            const _files: any[] = files.slice(0, files.length);
            _files.splice(index, 1);
            setFiles(_files);
        }
        return (
            <Flex>
                <Box color="#718096" fontSize="16px" fontWeight="400" fontFamily="Lato" paddingEnd={1}>
                    {file?.name}
                </Box>
                <Button
                    minWidth={0}
                    height="26px"
                    p={0} marginEnd={5}
                    onClick={removeFile}
                    backgroundColor="white"
                    _focus={{ border: "none" }}
                    _hover={{ backgroundColor: "white" }}
                    _active={{ backgroundColor: "white" }}
                >
                    <CloseIcon color="#fff" borderRadius="50%" backgroundColor="#C72F2F" fontSize="12px" padding="2px" />
                </Button>
            </Flex>
        )
    }

    return (
        <FormControl isRequired={required}>
            {!!label && (
                <FormLabel
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize="17px"
                    lineHeight="132%"
                    isTruncated
                >
                    {label}
                </FormLabel>
            )}
            <Stack direction="row" flexWrap="wrap" border="1px solid #E2E8F0" padding="10px" borderRadius="6px" minH="48px">
                {files?.map((file, index) => {
                    return (
                        <FileItem file={file} index={index} key={index} />
                    );

                })}
            </Stack>
            <Box>
                <input hidden id="file" type="file" accept="image/*" onChange={addFile} />
                <FormLabel htmlFor="file" fontSize="14px" fontWeight="600" color="#3333FF" marginTop={2}>{name}</FormLabel>
            </Box>
        </FormControl>
    );
};
export default FileUpload;