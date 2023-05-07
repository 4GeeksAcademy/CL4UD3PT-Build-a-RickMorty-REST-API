"""empty message

Revision ID: efb67cebde24
Revises: e5362a65a592
Create Date: 2023-05-05 18:44:18.344785

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'efb67cebde24'
down_revision = 'e5362a65a592'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('favorite_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('favorite_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
