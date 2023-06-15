/* eslint-disable react/prop-types */
import { Close, DeleteOutline, EditOutlined, PowerSettingsNew } from '@mui/icons-material';

import { Box, ButtonGroup, IconButton, Tooltip } from '@mui/material';
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
              <IconButton onClick={() => !Router.route.includes('projects') && !row.type === 'Project' && editRoute && Router.push(`${editRoute}${row.id}`) } >
                <EditOutlined fontSize="small" color={'primary'} />
              </IconButton>
            </Link>
          </Box>
        </Tooltip>
      )}
      {!!onReactivation && isCancelled && (
        <Tooltip title={'Reabrir'}>
          <IconButton onClick={() => onReactivationClick(row)} size="small">
            <PowerSettingsNew color={'warning'} fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {!!onCancel && !isCancelled && !isFinished && (
        <Tooltip title={'Cancelar'}>
          <IconButton onClick={() => onCancel(row)} size="small">
            <Close color={'warning'} fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {!!onDelete && (
        <Tooltip title={'Remover'} >
          <IconButton onClick={() => onDeleteClick(row)} size="small">
            <DeleteOutline color={'error'} fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

export default DisplayActionButtons;
