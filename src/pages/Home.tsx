import { Link, Box, Flex } from "@chakra-ui/react";
import * as React from "react";

const Home: React.FC = () => {
    return (
        <Flex justifyContent="center" alignItems="center" height="600px" direction="column">
            <Link href="/pay" backgroundColor="#3333FF" padding={[1, 2]} marginBottom={2} borderRadius="4px" color="white">Contas a pagar</Link>
            <Link href="/receive" backgroundColor="#3333FF" padding={[1, 2]} marginBottom={2} borderRadius="4px" color="white">Contas a receber</Link>
            <Link href="/cash" backgroundColor="#3333FF" padding={[1, 2]} marginBottom={2} borderRadius="4px" color="white">Fluxo de caixa</Link>
            <Link href="/invoice" backgroundColor="#3333FF" padding={[1, 2]} marginBottom={2} borderRadius="4px" color="white">Notas fiscais</Link>
            <Link href="/workshoparea" backgroundColor="#3333FF" padding={[1, 2]} marginBottom={2} borderRadius="4px" color="white">WorkshopArea</Link>
        </Flex>
    );
}

export default Home;