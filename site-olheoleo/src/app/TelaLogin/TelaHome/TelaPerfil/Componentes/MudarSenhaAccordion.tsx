import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MudarSenhaAccordion() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                Mudar senha
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    label="Senha"
                    variant="standard"
                    fullWidth
                    type="password"
                />

                <TextField
                    label="Confirmar senha"
                    variant="standard"
                    fullWidth
                    type="password"
                />
            </AccordionDetails>
        </Accordion>
    );
}