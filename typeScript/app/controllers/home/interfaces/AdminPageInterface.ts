export interface AdminPageInterface {
    index(req, res, next);

    create(req, res, next);

    store(req, res, next);

    edit(req, res, next);

    update(req, res, next);

    destroy(req, res, next);
}
