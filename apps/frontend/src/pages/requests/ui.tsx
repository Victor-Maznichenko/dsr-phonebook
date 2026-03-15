import type { AccessRequestStatus } from '@/shared/lib';
import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';
import { ACCESS_REQUEST_STATUS } from '@/shared/lib';
import { ActionButton, Condition, Select, Table, Typography } from '@/shared/ui';
import { model } from './model';
import styles from './styles.module.scss';

const statusOptions = [
  { value: ACCESS_REQUEST_STATUS.Pending, label: 'Ожидание' },
  { value: ACCESS_REQUEST_STATUS.Rejected, label: 'Отказ' },
  { value: ACCESS_REQUEST_STATUS.Approved, label: 'Разрешен' }
];

export const RequestsPage = () => {
  const [accessRequests, changeStatus, deleteAccessRequest] = useUnit([
    model.$accessRequests,
    model.changeStatus,
    model.deleteAccessRequest
  ]);

  const tableContent = useList(model.$accessRequests, ({ id, grantee, target, status, createdAt }) => (
    <Table.Tr key={id}>
      <Table.Td>{id}</Table.Td>
      <Table.Td>{`${grantee.firstName} ${grantee.lastName}`}</Table.Td>
      <Table.Td>{`${target.firstName} ${target.lastName}` }</Table.Td>
      <Table.Td>
        <Select
          onChange={(value) => changeStatus({ id, status: value as AccessRequestStatus })}
          items={statusOptions}
          value={status}
        />
      </Table.Td>
      <Table.Td>{createdAt.slice(0, 10).replaceAll('-', '.')}</Table.Td>
      <Table.Td>
        <ActionButton className={styles.requestDelete} onClick={() => deleteAccessRequest(id)} name='Trash' />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={clsx('container', styles.inner)}>
      <Typography className={styles.title} variant='heading_2' as='h2'>Запросы доступа:</Typography>
      <Condition
        else={
          (
            <Table.Root>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Запросник</Table.Th>
                  <Table.Th>Таргет</Table.Th>
                  <Table.Th>Статус</Table.Th>
                  <Table.Th>Дата создания</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                {tableContent}
              </Table.TBody>
            </Table.Root>
          )
        }
        value={accessRequests.length === 0}
        then='Ничего не найдено...'
      />
    </div>
  );
};
