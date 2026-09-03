import unittest
from pathlib import Path

from PIL import Image, ImageChops


class DrawerAssetTest(unittest.TestCase):
    def test_open_drawer_stays_within_cabinet_width(self):
        assets = Path(__file__).parent.parent / "素材" / "图片【移除背景】"
        closed = Image.open(assets / "场景_儿童房背景_默认_桌面.webp").convert("RGB")
        opened = Image.open(assets / "场景_儿童房背景_抽屉打开_桌面.webp").convert("RGB")

        changed_bounds = ImageChops.difference(closed, opened).getbbox()

        self.assertIsNotNone(changed_bounds)
        self.assertLessEqual(changed_bounds[2], 532)


if __name__ == "__main__":
    unittest.main()
