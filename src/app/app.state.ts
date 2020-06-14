import { State } from "@ngxs/store";
import {
  StateRepository,
  DataAction,
  Debounce,
  Payload,
  Computed,
  Persistence,
} from "@ngxs-labs/data/decorators";
import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { Injectable } from "@angular/core";
import { patch, append, removeItem } from "@ngxs/store/operators";
import { map } from "rxjs/operators";

@Persistence()
@StateRepository()
@State<AppStateModel>({
  name: "app",
  defaults: {
    todos: [],
  },
})
@Injectable()
export class AppState extends NgxsDataRepository<AppStateModel> {
  @Computed()
  public get toDos$() {
    return this.state$.pipe(map((state) => state.todos));
  }

  @Computed()
  public get count$() {
    return this.state$.pipe(map((state) => state.todos.length));
  }

  @Debounce()
  @DataAction()
  public addToDo(@Payload("toDo") toDo: ToDo) {
    this.ctx.setState(patch({ todos: append([toDo]) }));
  }

  @DataAction()
  public removeToDo(@Payload("toDo") toDo: ToDo) {
    this.ctx.setState(
      patch({ todos: removeItem((item) => item.createdAt === toDo.createdAt) })
    );
  }
}

export interface AppStateModel {
  todos: ToDo[];
}

export interface ToDo {
  createdAt: number;
  description: string;
}
