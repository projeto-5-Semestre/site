import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EditarPerfilAccordion() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                Editar perfil
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    label="Nome"
                    variant="standard"
                    fullWidth
                />

                <TextField
                    label="Email"
                    variant="standard"
                    fullWidth
                />
            </AccordionDetails>
        </Accordion>
    );
}