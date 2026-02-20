import type { Model, ModelCtor } from "sequelize-typescript";

export class BaseService<T extends Model> {
  constructor(private repository: ModelCtor<T>) {}

  /** Находит все записи, соответствующие опциям */
  findAll(...params: Parameters<ModelCtor<T>['findAll']>) {
    return this.repository.findAll(...params);
  }

  /** Находит одну запись по опциям. */
  findOne(...params: Parameters<ModelCtor<T>['findOne']>) {
    return this.repository.findOne(...params);
  }
  
  /** Обновляет записи, соответствующие условию */
  update(...params: Parameters<ModelCtor<T>['update']>) {
    return this.repository.update(...params);
  }

  /** Удаляет записи, соответствующие условию */
  destroy(...params: Parameters<ModelCtor<T>['destroy']>) {
    return this.repository.destroy(...params);
  }
}
