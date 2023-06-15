/* eslint-disable react/prop-types */

import { Box, ButtonGroup, IconButton, Tooltip } from '@mui/material';
import { Edit2, Power, Trash, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DisplayActionButtons = ({
  editRoute,
  Router,
  row,
  onReactivation,
  onReactivationClick,
  onCancel,
  onDelete,
  onDeleteClick,
}) => {
  const status = row.status?.value || row.budgetStatus?.value;
  const isCancelled = status === 'canceled';
  const isFinished = status === 'finished';

  return (
    <ButtonGroup>
      {editRoute && !(Router.route.includes('projects') && row.type === 'Project') && (
        <Tooltip title={'Editar'}>
          <Box style={{ color: 'red' }} display={isCancelled && 'none'}>
            <Link href={`${editRoute}${row.id}`}>
              <IconButton color='primary' onClick={() => !Router.route.includes('projects') && !row.type === 'Project' && editRoute && Router.push(`${editRoute}${row.id}`) } >
                <Edit2 size={20} strokeWidth={1.5} />
              </IconButton>
            </Link>
          </Box>
        </Tooltip>
      )}
      {!!onReactivation && isCancelled && (
        <Tooltip title={'Reabrir'}>
          <IconButton color={'warning'} onClick={() => onReactivationClick(row)} size="small">
            <Power size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
      )}
      {!!onCancel && !isCancelled && !isFinished && (
        <Tooltip title={'Cancelar'}>
          <IconButton color={'warning'} onClick={() => onCancel(row)} size="small">
            <X size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
      )}
      {!!onDelete && (
        <Tooltip title={'Apagar'} >
          <IconButton color={'error'} onClick={() => onDeleteClick(row)} size="small">
            <Trash size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

export default DisplayActionButtons;
