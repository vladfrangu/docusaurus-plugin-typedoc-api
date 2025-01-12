import React from 'react';
import { JSONOutput } from 'typedoc';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function replaceWithSrc(url: string): string {
	// Always link the source file
	return url.replace(/\/(dts|dist|lib|build)\//, '/src/');
}

export interface SourceLinkProps {
	sources?: JSONOutput.SourceReference[];
}

export function SourceLink({ sources = [] }: SourceLinkProps) {
	const { siteConfig } = useDocusaurusContext();

	if (sources.length === 0) {
		return null;
	}

	return (
		<>
			{sources.map((source) => (
				<a
					key={source.fileName}
					className="tsd-anchor"
					href={`https://github.com/${siteConfig.organizationName}/${
						siteConfig.projectName
					}/blob/master/${replaceWithSrc(source.fileName)}#L${source.line}`}
					rel="noreferrer"
					target="_blank"
				>
					<i className="codicon codicon-file-code" />
				</a>
			))}
		</>
	);
}
