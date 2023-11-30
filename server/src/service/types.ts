export type DependabotAlert = {
    number: 2;
    state: string;
    dependency: {
        package: {
            ecosystem: string;
            name: string;
        };
        manifest_path: string;
        scope: string;
    };
    security_advisory: {
        ghsa_id: string;
        cve_id: string;
        summary: string;
        description: string;
        vulnerabilities: {
            package: {
                ecosystem: string;
                name: string;
            };
            severity: string;
            vulnerable_version_range: string;
            first_patched_version: {
                identifier: string;
            };
        }[];

        severity: string;
        cvss: {
            vector_string: string;
            score: number;
        };
        cwes: {
            cwe_id: string;
            name: string;
        }[];
        identifiers: {
            type: string;
            value: string;
        }[];
        references: {
            url: string;
        }[];

        published_at: string;
        updated_at: string;
        withdrawn_at: string;
    };
};

export type CodeScannerAlert = {
    number: number;
    created_at: string;
    url: string;
    html_url: string;
    state: string;
    fixed_at: string | null;
    dismissed_by: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    } | null;
    dismissed_at: string | null;
    dismissed_reason: string | null;
    dismissed_comment: string | null;
    rule: {
        id: string;
        severity: string;
        tags: string[];
        description: string;
        name: string;
    };
    tool: {
        name: string;
        guid: string | null;
        version: string;
    };
    most_recent_instance: {
        ref: string;
        analysis_key: string;
        category: string;
        environment: string;
        state: string;
        commit_sha: string;
        message: {
            text: string;
        };
        location: {
            path: string;
            start_line: number;
            end_line: number;
            start_column: number;
            end_column: number;
        };
        classifications: string[];
    };
    instances_url: string;
};

export type File = {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content: string;
    encoding: string;
    _links: {
        self: string;
        git: string;
        html: string;
    };
};

export type FilesResult = {
    [path: string]: string;
};