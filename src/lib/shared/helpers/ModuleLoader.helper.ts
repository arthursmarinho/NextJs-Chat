import {glob} from "fast-glob";
import path from "path";

const CONTROLLERS_PATH = "src/lib/api/controllers";
const DTOS_PATH = "src/lib/shared/dtos";
const MODELS_PATH = "src/lib/shared/models";

type FileType = "controller" | "dto" | "model";

type ExportMap = Map<string, Function[]>;

const FileTypePath: Record<FileType, string> = {
  controller: CONTROLLERS_PATH,
  dto: DTOS_PATH,
  model: MODELS_PATH,
};

export class ModuleLoader {
  get exports(): Function[] {
    return Array.from(this.map.values()).flat();
  }
  get map(): ExportMap {
    return this.exportsMap;
  }

  private dirPath: string;

  private exportsMap: ExportMap = new Map<string, Function[]>();

  constructor(private type: FileType) {
    this.dirPath = FileTypePath[type];
  }

  async loadExports(): Promise<void> {
    const fileNames: string[] = (await glob(`${this.dirPath}/**/*.ts`)).map(
      (file) => path.relative(this.dirPath, file)
    );

    for (const fileName of fileNames) {
      const filePath = `${this.dirPath}/${fileName}`;

      let module;
      if (this.type === "controller") {
        module = await import(`@/lib/api/controllers/${fileName}`);
      } else if (this.type === "dto") {
        module = await import(`@/lib/shared/dtos/${fileName}`);
      } else if (this.type === "model") {
        module = await import(`@/lib/shared/models/${fileName}`);
      }

      for (const exported of Object.values(module)) {
        if (typeof exported !== "function") continue;

        const target = exported;
        if (!this.exportsMap.has(filePath)) this.exportsMap.set(filePath, []);

        this.exportsMap.get(filePath)!.push(target);
      }
    }
  }
}
