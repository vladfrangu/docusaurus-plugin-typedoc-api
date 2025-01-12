import path from 'path';
import { JSONOutput, ReflectionKind } from 'typedoc';
import { ResolvedPackageConfig } from '../types';

export function getKindSlug(decl: JSONOutput.DeclarationReflection): string {
	switch (decl.kind) {
		case ReflectionKind.Module:
			return 'package';
		case ReflectionKind.Namespace:
			return 'namespace';
		case ReflectionKind.Enum:
			return 'enum';
		case ReflectionKind.Function:
			return 'function';
		case ReflectionKind.Class:
			return 'class';
		case ReflectionKind.Interface:
			return 'interface';
		default:
			return '';
	}
}

export function getPackageSlug(pkgConfig: ResolvedPackageConfig, importPath: string): string {
	// packages/foo -> foo
	const packageFolder = pkgConfig.packageSlug ?? path.basename(pkgConfig.packagePath);

	// bar/baz -> bar-baz
	const importName = importPath.replace(/\\/g, '-');

	if (importName === 'index') {
		return packageFolder;
	}

	return `${packageFolder}-${importName}`;
}
